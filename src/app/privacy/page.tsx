import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy and Data Protection guidelines for Gadget Repair.",
};

export default function PrivacyPage() {
  return (
    <div className="section-paper min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="font-headline text-4xl text-ink mb-8">Privacy Policy</h1>
        
        <div className="prose prose-neutral max-w-none text-ink space-y-6">
          <p><strong>Last Updated:</strong> October 2026</p>
          
          <h2>1. Data Controller</h2>
          <p>
            Gadget Repair ("we", "us", "our") is the Data Controller for the purposes of the General Data Protection Regulation (GDPR) and the UK Data Protection Act 2018.
          </p>

          <h2>2. Lawful Bases for Processing</h2>
          <p>We process your personal data under the following lawful bases:</p>
          <ul className="list-disc pl-5">
            <li><strong>Contractual evaluation:</strong> To provide you with a quote and perform repair services.</li>
            <li><strong>Legitimate interests:</strong> For security monitoring, fraud prevention, and operational integrity.</li>
            <li><strong>Consent:</strong> When you opt-in to marketing communications or optional cookies.</li>
          </ul>

          <h2>3. Cookie Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-line-dark">
                  <th className="py-2 pr-4 font-bold">Identifier</th>
                  <th className="py-2 pr-4 font-bold">Provider</th>
                  <th className="py-2 pr-4 font-bold">Lifespan</th>
                  <th className="py-2 pr-4 font-bold">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line-light">
                  <td className="py-2 pr-4 font-mono">cookie-consent</td>
                  <td className="py-2 pr-4">Gadget Repair</td>
                  <td className="py-2 pr-4">1 Year</td>
                  <td className="py-2 pr-4">Strictly Necessary: Remembers your consent preference.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>4. Data Subject Rights</h2>
          <p>
            Under the GDPR, you have the right to Access, Rectification, Erasure, and Portability of your data. To exercise these rights, please contact us at info@gadgetrepair.uk. You also have the right to lodge a complaint with the UK Information Commissioner's Office (ICO).
          </p>
        </div>
      </div>
    </div>
  );
}
