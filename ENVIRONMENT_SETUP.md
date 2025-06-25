# Environment Setup

## Important Security Notice
⚠️ **NEVER commit `.env` files to version control!** They contain sensitive credentials.

## Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your actual values:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string (minimum 32 characters)
   - `CLIPDROP_API`: Your ClipDrop API key
   - `RAZORPAY_KEY_ID`: Your Razorpay test/live key ID
   - `RAZORPAY_KEY_SECRET`: Your Razorpay test/live secret
   - `RAZORPAY_WEBHOOK_SECRET`: Your webhook secret

## Environment Variables

### Database
- `MONGODB_URI`: MongoDB connection string with credentials
- Format: `mongodb+srv://username:password@cluster.mongodb.net/database`

### Authentication
- `JWT_SECRET`: Secret key for JWT token signing
- Should be a long, random string (recommended: 64+ characters)

### AI Image Generation
- `CLIPDROP_API`: API key from ClipDrop service
- Get yours at: https://clipdrop.co/apis

### Payment Processing
- `RAZORPAY_KEY_ID`: Public key from Razorpay dashboard
- `RAZORPAY_KEY_SECRET`: Private key from Razorpay dashboard
- `RAZORPAY_WEBHOOK_SECRET`: Secret for webhook verification

## Production Deployment

For production environments:
1. Use environment-specific variables
2. Enable additional security measures
3. Use production MongoDB cluster
4. Switch to live Razorpay keys
5. Use strong JWT secrets

## Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use strong, unique secrets
3. ✅ Rotate credentials regularly
4. ✅ Use different credentials for different environments
5. ✅ Limit database user permissions
6. ✅ Enable MongoDB IP whitelist
7. ✅ Use HTTPS in production
