import MainLayout from "@/layouts/MainLayout";
import MainHeader from "../../components/shared/headers/MainHeader";

const TermsConditions = () => {
  return (
    <>
      <MainHeader />
      <div className="terms-condition-container">
        <h1 className="text-[15px] md:text-[25px] text-center font-bakbak-one text-white mb-[15px] md:mb-[23px]">
          Terms and Conditions
        </h1>
        {/* <hr style={{ border: "1px solid #5A5A5A" }} /> */}

        <div className="top-section">
          <h1 className="date-title">Effective Date: 10/27/2023</h1>
          <p className="table-content">Table of Contents:</p>
          <div className="top-content">
            <p>Acceptance of Terms</p>
            <p>Age Restriction</p>
            <p>User Rights and Responsibilities</p>
            <p>Privacy and Data Use</p>
            <p>Intellectual Property</p>
            <p>Payments and Fees</p>
            <p>Dispute Resolution</p>
            <p>Liability and Disclaimers</p>
            <p>Change to Terms</p>
          </div>
        </div>

        <div className="terms-condition-content-container">
          <p>1. Acceptance of Terms</p>
          <p>
            By using The Wallpaper Society website, you agree to be bound by the
            following Terms and Conditions. If you do not agree to these terms,
            please do not use the website.
          </p>
          <p>2. Age Restriction</p>
          <p>
            There are no age restrictions for accessing our website. However,
            certain content on this website may be of a sensitive nature. Users
            under the age of 18 should be aware of this and proceed with
            caution.
          </p>
          <p>3. User Rights and Responsibilities</p>
          <p>
            Please refer to our Community Guidelines page for a comprehensive
            understanding of the allowed and prohibited uses of our website.
          </p>
          <p>4. Privacy and Data Use</p>
          <p>
            We do not collect, store, or sell user data beyond essential cookies
            and email addresses for account creation. For more details, please
            review our Privacy Policy.
          </p>
          <p>5. Intellectual Property</p>
          <p>
            All intellectual property rights, such as copyright and trademarks,
            belong to their respective owners. The Wallpaper Society does not
            claim ownership of any user-uploaded content. Users are responsible
            for ensuring they have the necessary rights to upload content. The
            website provides tools to credit the respective owners, and content
            owners may claim their content.
          </p>
          <p>6. Payments and Fees</p>
          <p>
            The Wallpaper Society does not require payments or involve any
            payment processing.
          </p>
          <p>7. Dispute Resolution</p>
          <p>
            In the event of disputes, we encourage arbitration and mediation for
            resolution. All disputes shall be governed by the laws of the United
            States, and any legal action shall be conducted within the
            appropriate jurisdiction.
          </p>
          <p>8. Termination</p>
          <p>
            Access to our website may be terminated for users who violate these
            Terms and Conditions. Users will be notified by email or through
            access restrictions.
          </p>
          <p>9. Liability and Disclaimers</p>
          <p>
            The Wallpaper Society assumes no liability for service
            interruptions, content accuracy, or third-party links.
          </p>
          <p>10. Changes to Terms</p>
          <p>
            We reserve the right to update or change these Terms and Conditions
            at any time without prior notice. Users are encouraged to review
            these terms regularly to stay informed. Important updates and
            communications will be shared via our social media channels.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;

TermsConditions.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
