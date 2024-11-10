/* eslint-disable react/no-unescaped-entities */
import banner from "../../assets/images/community-rules/bg.png";
import MainHeader from "../../components/shared/headers/MainHeader";
import MainLayout from "@/layouts/MainLayout";
const CommunityRules = () => {
  return (
    <>
      <MainHeader />
      <h1 className="text-[15px] md:text-[25px] text-center font-bakbak-one text-white mb-[15px] md:mb-[23px]">
        Community Rules
      </h1>
      {/* <hr style={{ border: "1px solid #5A5A5A" }} /> */}

      <div className="relative mt-[15px] md:mt-[23px] rounded-[7px] md:rounded-[14px] overflow-hidden">
        <img
          src={banner.src}
          className="w-full h-full max-h-[133px] rounded-[7px] md:rounded-[14px] md:max-h-[294px] object-cover"
          alt=""
        />
        <div
          className="absolute top-0 w-full h-full"
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%)`,
          }}
        ></div>
      </div>
      <div className="cmr-content-container">
        <h1 className="text-center font-extrabold font-lato text-[15px] md:text-[20px] mb-[22px] md:mb-[54px]">
          General Rules
        </h1>
        <ol className="ps-0">
          <p className="mt-3 cr_text_gray ">
            <span className="fw-bold">
              1.- Always respect copyright and intellectual property rights:
            </span>{" "}
            Use the tools provided in the uploader to credit the creator and add
            the original source wherever possible. Properly attribute the author
            when uploading content.
          </p>
          <p className="mt-3 cr_text_gray ">
            <span className="fw-bold">2.- Source Restrictions:</span>
            upload content from sources that have been banned or deemed
            unauthorized.
          </p>
          <p className="mt-3 cr_text_gray">
            <span className="fw-bold">3.- Artist Signatures/Watermarks:</span>{" "}
            Do not Do not remove artist signatures or watermarks from images;
            maintain the integrity of the original work.
          </p>
          <p className="mt-3 cr_text_gray">
            <span className="fw-bold">4.- Prohibited Content:</span>
            content of a sexual nature, or overly sexual images, is strictly
            prohibited. See further details below:
          </p>

          <ul className="ms-md-4 mt-3 cr_text_gray">
            <li>
              <span>Explicit Content:</span> The platform does not permit
              explicit sexual content in any form. Example: Nudes.
            </li>
            <li>
              <span>Inappropriate Edits:</span> Avoid low-quality edits,
              alteration of original work, mirroring, or picture-in-picture
              compositions.
            </li>
          </ul>
          <p className="mt-3 cr_text_gray">
            <span className="fw-bold">5.- Set Limitations:</span>Each set,
            whether from a photo shoot or AI prompt, should contain a maximum of
            three images.
          </p>
          <p className="mt-3 cr_text_gray">
            <span className="fw-bold">6.- Privacy and Respect:</span> Do not
            upload private photos of individuals, including family and friends,
            or any form of adult content.
          </p>
          <p className="mt-3 cr_text_gray">
            <span className="fw-bold">7.- Promotional Materials:</span> Content
            with significant watermarks, red carpet or press event photos, and
            low-resolution samples should not be uploaded.
          </p>
          <p className="mt-3 cr_text_gray">
            <span className="fw-bold">8.- High-Quality Screenshots:</span> Only
            high-quality screenshots from movies, TV series, anime, and video
            games are allowed. Screenshots should not contain overlays, HUDs, or
            logos. Screenshots of desktops are not permitted.
          </p>
          <p className="mt-3 cr_text_gray">
            <span className="fw-bold">9.- Disturbing Content:</span> The
            platform strictly prohibits content featuring gore or any other
            disturbing and offensive materials.
          </p>
          <p className="mt-3 cr_text_gray">
            <span className="fw-bold">10.- Tagging and Flagging:</span>
            When uploading diverse content sets, please tag and flag them
            separately to ensure accurate sorting. When tagging your uploads,
            it's important to use relevant terms directly associated with the
            content you're sharing. For instance, if you're uploading a
            Cyberpunk-themed wallpaper, your tags should include terms such as
            "Cyberpunk," "dystopian," "synth," "future," "tech," and any other
            tags pertinent to the uploaded content. We kindly request that you
            avoid using personal tags or tags for promotional purposes.
          </p>
        </ol>
      </div>

      <hr
        className="sm_none"
        style={{ border: "1px solid #5A5A5A", marginTop: "54px" }}
      />
      <section className="cmr-content-categories">
        <h1 className="cmr-title mt-5">Content Categories</h1>
        <p className="text-center mt-4">
          We categorize our content into two distinct categories:{" "}
          <span style={{ color: "#0AB745", fontWeight: "bold" }}>SFW</span>{" "}
          <span style={{ color: "#A7A7A7" }}>(Safe For Work)</span> and{" "}
          <span style={{ color: "#FD0020", fontWeight: "bold" }}>NSFW</span>{" "}
          <span style={{ color: "#A7A7A7" }}>(Not Safe For Work)</span>.
        </p>

        <ul className="mt-4 cr_text_gray ">
          <li>
            <span style={{ color: "#0AB745", fontWeight: "bold" }}>SFW</span>{" "}
            content comprises images that are neither explicit nor sexual in
            nature. These images are appropriate for a wide audience and often
            include graphics, artwork, and content suitable for all ages.
          </li>
          <li className="mt-2">
            <span style={{ color: "#FD0020", fontWeight: "bold" }}>NSFW</span>{" "}
            content includes images that may contain elements of aggression,
            revealing modeling, suggestive poses, graphic violence, or other
            potentially mature themes. Content in this category is intended for
            mature audiences and may not be suitable for all viewers.
          </li>
        </ul>
      </section>
    </>
  );
};

export default CommunityRules;

CommunityRules.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
