import RulesHeader from "../../components/shared/headers/RulesHeader";
import bg from "../../assets/images/Copyright-Information/bg.png";
import MainLayout from "@/layouts/MainLayout";

const CopyrightInformation = () => {
  return (
    <>
      <RulesHeader />
      <div>
        <h1 className="text-center font-bakbak-one text-[15px] md:text-[25px] text-white">
          Copyright Information
        </h1>
        <div className="border-t-[1px] border-[#5A5A5A] w-full mt-[14px] mb-[15px] md:mt-[23px] md:mb-[23px]"></div>
        <div
          className="md:h-[294px] w-full rounded-[5px] hidden md:block"
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url(${bg.src})`,
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="h-[133px] w-full rounded-[5px] md:hidden"
          style={{
            background: `url(${bg.src})`,
            backgroundSize: "100%",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="max-w-[1364px] mx-auto font-lato mt-[27px] md:mt-[46px]">
          <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px]">
            <span className="text-[12px] md:text-[20px] font-extrabold text-white">
              Ownership of Artwork:
            </span>
            {"  "}
            We, at WPS, do not claim ownership of any artwork shared or posted
            within this website. Our platform is designed to enable users to
            upload content while crediting their respective owners and adding
            the source information. If you are the owner of any artwork on this
            website and would like to claim ownership or report a listing,
            please follow the procedures outlined below.
          </p>
          <div className="mt-[23px] md:mt-[32px]">
            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px]">
              <span className="text-[12px] md:text-[20px] font-extrabold text-white">
                Claiming Ownership:
              </span>
              {"  "}
              If you are the rightful owner of any artwork displayed on The
              Wallpaper Society and wish to assert your ownership, we kindly
              request that you contact us with the following details:
            </p>

            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px] flex items-center md:justify-center gap-2 mt-[27px]">
              <div className="min-h-[6px] min-w-[6px] max-h-[6px] max-w-[6px] bg-white rounded-full"></div>
              {"  "}A detailed description of the artwork in question.
            </p>
            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px] flex items-center md:justify-center gap-2">
              <div className="min-h-[6px] min-w-[6px] max-h-[6px] max-w-[6px] bg-white rounded-full"></div>
              {"  "}Your full name and contact information.
            </p>
            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px] flex items-center md:justify-center gap-2">
              <div className="min-h-[6px] min-w-[6px] max-h-[6px] max-w-[6px] bg-white rounded-full"></div>
              {"  "}Proof of your ownership, which may include original creation
              files, purchase receipts, or other relevant documentation.
            </p>
            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px] mt-[27px]">
              Upon receipt of this information, we will promptly review your
              claim and, if substantiated, take the necessary actions to
              acknowledge your ownership rights.
            </p>
          </div>

          <div className="mt-[23px] md:mt-[32px]">
            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px]">
              <span className="text-[12px] md:text-[20px] font-extrabold text-white">
                Reporting a Listing:
              </span>
              {"  "}
              We take copyright infringement seriously and are committed to
              upholding the rights of artists and creators. If you believe that
              your copyrighted work has been posted on The Wallpaper Society
              without your consent, please follow these steps to report the
              listing:
            </p>

            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px] flex items-center md:justify-center gap-2 mt-[27px]">
              <div className="min-h-[6px] min-w-[6px] max-h-[6px] max-w-[6px] bg-white rounded-full"></div>
              {"  "}Provide the URL of the infringing content.
            </p>
            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px] flex items-center md:justify-center gap-2">
              <div className="min-h-[6px] min-w-[6px] max-h-[6px] max-w-[6px] bg-white rounded-full"></div>
              {"  "}Explain how your copyright is being violated.
            </p>
            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px] flex items-center md:justify-center gap-2">
              <div className="min-h-[6px] min-w-[6px] max-h-[6px] max-w-[6px] bg-white rounded-full"></div>
              {"  "}Include your contact information for correspondence.
            </p>

            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px] mt-[27px]">
              Upon receiving your report, we will initiate a prompt
              investigation and take appropriate actions, including content
              removal, in accordance with the applicable laws and regulations.
            </p>
          </div>

          <div className="mt-[23px] md:mt-[32px]">
            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px]">
              <span className="text-[12px] md:text-[20px] font-extrabold text-white">
                General Copyright Information:
              </span>
              {"  "}
              It is important for all users of The Wallpaper Society to respect
              copyright laws and the intellectual property rights of others.
              Please be aware of the following:
            </p>

            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px] flex items-center md:justify-center gap-2 mt-[27px]">
              <div className="min-h-[6px] min-w-[6px] max-h-[6px] max-w-[6px] bg-white rounded-full"></div>
              {"  "}Do not upload, share, or use any content for which you do
              not have the necessary permissions or rights.
            </p>
            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px] flex items-center md:justify-center gap-2">
              <div className="min-h-[6px] min-w-[6px] max-h-[6px] max-w-[6px] bg-white rounded-full"></div>
              {"  "}Always credit the original creators and provide source
              information when uploading content to our website.
            </p>
            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px] flex items-center md:justify-center gap-2">
              <div className="min-h-[6px] min-w-[6px] max-h-[6px] max-w-[6px] bg-white rounded-full"></div>
              {"  "}If in doubt about the legality of using any content, seek
              legal advice or consult the intellectual property rights holder.
            </p>

            <p className="font-medium text-[#E3E3E3] font-lato text-left md:text-center text-[12px] md:text-[20px] mt-[23px] md:mt-[32px]">
              <span className="text-[12px] md:text-[20px] font-extrabold text-white">
                Contact Information:
              </span>
              {"  "}
              For any copyright-related concerns or inquiries, please reach out
              to us at copyrights@wallpapersociety.com Thank you for your
              cooperation and understanding. We are committed to maintaining a
              platform that respects the rights of artists and content creators
              while providing a positive and creative space for our users.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CopyrightInformation;

CopyrightInformation.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
