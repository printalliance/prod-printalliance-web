import Head from "next/head";
import { siteUrl } from "@/utils/seo";

const PrivacyPage = () => (
  <>
    <Head>
      <title>Privacy Policy | PrintAlliance</title>
      <meta
        name="description"
        content="Learn how PrintAlliance collects, protects, and uses data to comply with GDPR and CCPA requirements."
      />
      <link rel="canonical" href={`${siteUrl}/privacy`} />
    </Head>
    <section className="section-padding">
      <div className="mx-auto max-w-4xl space-y-6 px-4">
        <h1 className="text-4xl font-bold text-navy">Privacy Policy for PrintAlliance</h1>
        
        <p className="text-gray-600">
          At PrintAlliance, accessible from Www.printalliance.net, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by PrintAlliance and how we use it.
        </p>

        <p className="text-gray-600">
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Policy Scope</h2>
          <p className="mt-2 text-gray-700">
            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in PrintAlliance. This policy is not applicable to any information collected offline or via channels other than this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Consent</h2>
          <p className="mt-2 text-gray-700">
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Information We Collect</h2>
          <p className="mt-2 text-gray-700">
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p className="mt-2 text-gray-700">
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>
          <p className="mt-2 text-gray-700">
            When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">How We Use Your Information</h2>
          <p className="mt-2 text-gray-700 mb-3">We use the information we collect in various ways, including to:</p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Log Files</h2>
          <p className="mt-2 text-gray-700">
            PrintAlliance follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Advertising Partners Privacy Policies</h2>
          <p className="mt-2 text-gray-700">
            You may consult this list to find the Privacy Policy for each of the advertising partners of PrintAlliance.
          </p>
          <p className="mt-2 text-gray-700">
            Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on PrintAlliance, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p className="mt-2 text-gray-700">
            Note that PrintAlliance has no access to or control over these cookies that are used by third-party advertisers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Third Party Privacy Policies</h2>
          <p className="mt-2 text-gray-700">
            PrintAlliance's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
          <p className="mt-2 text-gray-700">
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p className="mt-2 text-gray-700">
            Under the CCPA, among other rights, California consumers have the right to:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
            <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
          </ul>
          <p className="mt-3 text-gray-700">
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">GDPR Data Protection Rights</h2>
          <p className="mt-2 text-gray-700 mb-3">
            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
          <p className="mt-3 text-gray-700">
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Children's Information</h2>
          <p className="mt-2 text-gray-700">
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
          </p>
          <p className="mt-2 text-gray-700">
            PrintAlliance does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Contact Us</h2>
          <p className="mt-2 text-gray-700">
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us on:
          </p>
          <div className="mt-3 text-gray-700 space-y-1">
            <p><a href="mailto:Support@printalliance.net" className="text-red hover:text-[#c92f3a]">Support@printalliance.net</a></p>
            <p><a href="tel:+13252195205" className="text-red hover:text-[#c92f3a]">🇺🇸 +1-325-219-5205</a></p>
          </div>
        </section>
      </div>
    </section>
  </>
);

export default PrivacyPage;

