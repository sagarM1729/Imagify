import userModel from "../models/userModel.js";
import axios from "axios";
import FormData from "form-data";

const generateImage = async (req, res) => {
  try {
    const { userId, prompt, size } = req.body;

    // Validate required fields
    if (!userId || !prompt || !size) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields',        required: ['userId', 'prompt', 'size']
      });
    }

    // Validate prompt length
    if (prompt.length < 3 || prompt.length > 1000) {
      return res.status(400).json({ 
        success: false,
        message: 'Prompt must be between 3 and 1000 characters long' 
      });
    }

    // Validate size format (ClipDrop returns 1024x1024, but we'll keep size for frontend compatibility)
    const validSizes = ['256x256', '512x512', '1024x1024'];
    if (!validSizes.includes(size)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid size. Valid sizes are: 256x256, 512x512, 1024x1024' 
      });
    }

    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check credit balance
    if (user.creditBalance <= 0) {
      return res.status(402).json({
        success: false,
        message: 'Insufficient credits. Please purchase more credits to generate images.',
        currentCredits: user.creditBalance
      });
    }    // Deduct 1 credit for image generation
    user.creditBalance -= 1;
    await user.save();

    // Generate image using ClipDrop API
    const formData = new FormData();
    formData.append('prompt', prompt);

    try {
      const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formData.getHeaders(),
        },
        responseType: 'arraybuffer',
      });

      // Get response headers for credit info
      const remainingApiCredits = response.headers['x-remaining-credits'];
      const apiCreditsConsumed = response.headers['x-credits-consumed'];

      // Convert image response to base64 for easier handling
      const imageBase64 = Buffer.from(response.data).toString('base64');
      const imageUrl = `data:image/png;base64,${imageBase64}`;

      res.status(200).json({ 
        success: true,
        message: 'Image generated successfully',
        imageUrl,
        prompt,
        size,
        userId,
        creditsUsed: 1,
        remainingCredits: user.creditBalance,
        apiCreditsRemaining: remainingApiCredits,
        apiCreditsConsumed: apiCreditsConsumed
      });

    } catch (apiError) {
      // Refund the credit if API call fails
      user.creditBalance += 1;
      await user.save();

      console.error('ClipDrop API Error:', apiError.message);
      
      const errorMessage = apiError.response?.data?.error || apiError.message || 'Unknown API error';
      const statusCode = apiError.response?.status || 500;

      return res.status(statusCode).json({
        success: false,
        message: 'Failed to generate image with ClipDrop API',
        error: errorMessage,
        creditsRefunded: 1
      });
    }
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to generate image',
      error: error.message 
    });
  }
}

export { generateImage };