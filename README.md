# Price Scraper App (Jumia)

The Price Scraper App is a powerful and easy-to-use tool for scraping and monitoring product prices online. Built with **Next.js** and **TypeScript**, it allows users to input product details and receive real-time updates on price changes. This app is perfect for developers looking for a customizable price-monitoring solution.

## Features

- **Product Monitoring**: Scrapes the product name, price, and availability.
- **Customizable Inputs**: Accepts user inputs for:
  - Product Name
  - Product URL
  - CSS Selector (to identify the price on the page)
  - User Email
- **Email Alerts**: Sends notifications to users when:
  - A price change is detected.
  - A scheduled daily email update is requested.
- **Real-time Scraping**: Fetches live product details from the provided URL.
- **Database Integration**: Stores user inputs and scraped data for persistent tracking.

---

## Getting Started

### Prerequisites

- **Node.js** (v16+ recommended)
- **Yarn** or **npm**
- **Supabase**: Used as the backend database
- **Nodemailer**: For email notifications

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jclinch/price-scraper-app.git
   cd price-scraper-app

yarn install
# or
npm install

### Usage
Input Details: Fill out the following fields:

- Product Name: A label for the product you want to monitor.
- Product URL: The direct link to the product's page.
- CSS Selector: The selector for the HTML element containing the price.
- Email Address: The email address to receive notifications.
- Submit the Form:

On submission, the app scrapes the product details and saves them to the database.
A confirmation email is sent to the user.
Daily Updates:

Scheduled cron jobs ensure users receive daily updates at their selected time.
Price Change Alerts:

Users are notified instantly when a price change is detected.
Technology Stack
Frontend: Next.js, TypeScript
Backend: Supabase, Nodemailer
Web Scraping: Puppeteer (or third-party scraping services)
Styling: Tailwind CSS
Email Scheduling: Node-Cron

### Contribution
Contributions are welcome! Feel free to submit a pull request or open an issue to suggest improvements or report bugs.

### Support
For questions or support, please contact sunnyugwu2011@gmail.com