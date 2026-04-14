'use client';

import { motion } from 'framer-motion';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-dark-100 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-white">
            Terms & <span className="gradient-text">Conditions</span>
          </h1>
          
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and TechniFuse ("we," "us," or "our"), concerning your access to and use of our mobile app development services, our zero-upfront subscription ecosystem, and the technifuse.com website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Services & Subscription Model</h2>
              <p className="mb-4">
                TechniFuse provides mobile application development and management services for e-commerce and D2C brands (particularly Shopify stores). Our services operate under a "Zero-Upfront Subscription Model", which includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Design, development, and deployment of native iOS & Android applications.</li>
                <li>Ongoing maintenance, server costs, and technical management.</li>
                <li>Updates to ensure compatibility with corresponding e-commerce platforms (e.g., Shopify updates).</li>
              </ul>
              <p className="mt-4">
                Specific subscription pricing, metrics, terms of cancellation limit, and required store connections will be outlined in your individual Service Level Agreement (SLA).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
              <p>
                As a client, your brand assets, products, logos, and customer databases remain entirely your intellectual property. TechniFuse retains the intellectual property rights to the underlying codebase, architecture, and proprietary AI tools used to construct and maintain the mobile applications, unless otherwise explicitly established in writing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Client Responsibilities</h2>
              <p>
                To maintain the functionality of the mobile application under our subscription service, clients must:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain an active, compliant presence on their designated e-commerce backend (e.g., Shopify).</li>
                <li>Ensure all products listed and sold through the mobile application comply with Apple App Store and Google Play Store guidelines.</li>
                <li>Provide necessary third-party API or developer accounts if specific features or white-labeling require it.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Termination</h2>
              <p>
                Either party may terminate the subscription services with written notice as defined within your specific SLA agreement. Upon termination, TechniFuse reserves the right to unpublish the app from the respective App Stores, and the client will no longer have access to the app infrastructure. We do not hold your store data hostage; you remain in complete control of your Shopify/e-commerce backend.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Contact Information</h2>
              <p>
                For any questions regarding these Terms and Conditions, or to report any violations, please contact us at: <a href="mailto:technifuse2005@gmail.com" className="text-accent-primary hover:underline">technifuse2005@gmail.com</a>
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
