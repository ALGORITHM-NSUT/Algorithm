// constants/emailTemplate.js

export const emailTemplate = (verificationLink) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <!-- Logo Section -->
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://res.cloudinary.com/dzmckbejo/image/upload/v1730973607/Algorithm/xa6ei73qoqhsjmoc1ahq.png" alt="Algorithm Logo" style="width: 120px; height: auto;">
        </div>
        
        <h2 style="color: #333; text-align: center;">Welcome to Algorithm!</h2>
        <p style="font-size: 16px; color: #555;">Hello,</p>
        <p style="font-size: 16px; color: #555;">
            Thank you for signing up with Algorithm! We're excited to have you on board. To complete your registration, please verify your email address by clicking the button below:
        </p>
        <p style="text-align: center;">
            <a href="${verificationLink}" style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-size: 16px;">Verify Your Email</a>
        </p>
        <p style="font-size: 14px; color: #555; text-align: center;">
            If you did not create an account, please ignore this email.
        </p>
        <hr style="border: 1px solid #ddd; margin-top: 20px;" />
        <p style="font-size: 12px; color: #777; text-align: center;">
            If you're having trouble with the button above, you can paste this link into your browser: <a href="${verificationLink}" style="color: #007bff;">${verificationLink}</a>
        </p>
    </div>
  `;
};

// constants/emailTemplate.js

export const passwordResetTemplate = (resetLink) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <!-- Logo Section -->
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://res.cloudinary.com/dzmckbejo/image/upload/v1730973607/Algorithm/xa6ei73qoqhsjmoc1ahq.png" alt="Algorithm Logo" style="width: 120px; height: auto;">
        </div>
        
        <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
        <p style="font-size: 16px; color: #555;">Hello,</p>
        <p style="font-size: 16px; color: #555;">We received a request to reset your password. To reset your password, please click the link below:</p>
        
        <p style="text-align: center;">
            <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-align: center; text-decoration: none; border-radius: 4px; font-size: 16px;">Reset Password</a>
        </p>

        <p style="font-size: 14px; color: #555;">If you did not request a password reset, please ignore this email.</p>
        <p style="font-size: 14px; color: #555;">Thank you for using Algorithm!</p>

        <p style="font-size: 12px; color: #999; text-align: center;">If you have any questions, feel free to contact us.</p>
    </div>
  `;
};

