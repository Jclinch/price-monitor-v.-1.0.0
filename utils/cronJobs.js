//path: C:\Users\Sunny\Documents\My Projects\New folder\price-monitor\utils\cronJobs.ts 
import cron from 'node-cron';
import { supabase } from '@/app/lib/supabaseClient';
import { sendEmail } from './sendEmail';

cron.schedule('0 10 * * *', async () => {
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Error fetching data for cron job:', error);
    return;
  }

  if (data) {
    let emailContent = 'Daily Price Report:\n\n';
    data.forEach(product => {
      emailContent += `Product URL: ${product.product_url}\nPrice: ${product.price}\nChecked On: ${product.date_checked}\n\n`;
    });

    await sendEmail('Daily Price Report', emailContent);
  }
});
