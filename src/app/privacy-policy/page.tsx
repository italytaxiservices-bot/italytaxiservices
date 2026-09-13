import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Italy Taxi Services',
  description: 'Privacy policy for Italy Taxi Services NCC transfer service. How we collect, use, and protect your personal data.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: January 2025</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-gray max-w-none">
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who We Are</h2>
              <p>Italy Taxi Services operates as a transfer intermediary service, connecting travellers with licensed NCC (Noleggio con Conducente) operators across Italy. Our website is <strong>italytaxiservices.com</strong>.</p>
              <p className="mt-3">For privacy enquiries, contact us at: <a href="mailto:info@italytaxiservices.com" className="text-green-600">info@italytaxiservices.com</a></p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Data We Collect</h2>
              <p>When you submit a quote request or contact us, we collect:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Name, email address, and phone/WhatsApp number</li>
                <li>Journey details: pickup location, destination, date, time, passenger count</li>
                <li>Vehicle preference and any special requests</li>
                <li>Source URL (the page where you submitted your request)</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide you with a transfer quote and book your journey</li>
                <li>To match your request with the appropriate NCC partner operator</li>
                <li>To contact you about your booking via WhatsApp or email</li>
                <li>To improve our service and website performance</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Sharing</h2>
              <p>Your booking details are shared only with the NCC operator fulfilling your transfer. We do not sell, rent, or trade your personal data with third parties for marketing purposes.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Retention</h2>
              <p>We retain booking records for up to 2 years for business and legal purposes. You may request deletion of your data at any time by contacting us.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights (GDPR)</h2>
              <p>Under GDPR, you have the right to: access your data, correct inaccurate data, request deletion, object to processing, and data portability. Contact us at info@italytaxiservices.com to exercise any of these rights.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">7. Cookies</h2>
              <p>Our website uses essential cookies only — for session management and basic analytics. We do not use tracking cookies for advertising purposes.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">8. Contact</h2>
              <p>For any privacy-related queries: <a href="mailto:info@italytaxiservices.com" className="text-green-600">info@italytaxiservices.com</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
