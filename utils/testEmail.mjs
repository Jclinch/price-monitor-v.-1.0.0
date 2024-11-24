import nodemailer from 'nodemailer';

async function testEmail() {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email provider if different
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
    logger: true, // Enable logging
    debug: true,  // Enable debugging
  });

  // Set up email data
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: 'ghostwarzone2222@gmail.com', 
    subject: 'Test Email uzumaki Naruto', 
    text: 'This is a test email sent using nodemailer. Rasengan sharingan', 
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Error sending test email123:', error);
  }
}

// Run the test function
testEmail();
