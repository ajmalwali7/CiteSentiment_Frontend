export function AboutUs() {
  return (
    <div className="w-full md:w-[75vw] lg:w-[82vw]">
      <div className="text-primary card shadow-xl mt-2 m-3 p-2 md:p-6 lg:p-9 bg-accent overflow-x-hidden h-fit lg:mt-9 lg:m-11 flex flex-col gap-5">
        <div>
          <h1 className="font-bold text-xl md:text-2xl mt-5 pl-4">
            Welcome to CiteSentiment
          </h1>
          <p className="pl-4 mt-2 text-lg">
            {`A pioneering initiative dedicated to transforming the way researchers and academics understand citation sentiments within scholarly articles.`}
            <br />
            {`At the heart of our mission lies a commitment to providing insightful analysis that enhances the research process and fosters a deeper understanding of academic discourse.`}
          </p>
        </div>
        <div>
          <h1 className="font-bold text-xl md:text-2xl mt-5 pl-4">
            Our Vision
          </h1>
          <p className="pl-4 mt-2 text-lg">
            {`Our vision is to empower researchers with the tools and insights they need to navigate the complex landscape of academic citations. We believe that understanding the sentiment behind citations can lead to more informed research and ultimately, a more connected and collaborative academic community.`}
          </p>
        </div>
        <div>
          <h1 className="font-bold text-xl md:text-2xl mt-5 pl-4">
            Our Mission
          </h1>
          <p className="pl-4 mt-2 text-lg">
            {`At CiteSentiment, our mission is to provide a cutting-edge platform that offers accurate and nuanced sentiment analysis of citations. We aim to:`}
          </p>
          <ol className="pl-4 py-3 flex flex-col gap-3">
            <li>
              <span className="font-medium text-lg">
                1 - Enhance Research Quality:
              </span>
              <span className="text-lg">{` Our platform helps researchers identify the tone and context of citations, leading to a more comprehensive understanding of academic influence and impact.`}</span>
            </li>
            <li>
              <span className="font-medium text-lg">
                2 - Foster Collaboration:
              </span>
              <span className="text-lg">{` By revealing the underlying sentiment in citations, we promote a more transparent and collaborative academic environment.`}</span>
            </li>
            <li>
              <span className="font-medium text-lg">
                3 - Support Academic Growth:
              </span>
              <span className="text-lg">{` Our tools assist in identifying key trends and influential works, enabling researchers to make more informed decisions and advance their scholarly contributions.`}</span>
            </li>
            <li>
              <span className="font-medium text-lg">
                4 - Ensure Data Security:
              </span>
              <span className="text-lg">{` We prioritize the security and privacy of our users' data, implementing robust measures to protect sensitive information.`}</span>
            </li>
          </ol>
        </div>

        <div>
          <h1 className="font-bold text-xl md:text-2xl mt-5 pl-4">
            Our Approach
          </h1>
          <p className="pl-4 mt-2 text-lg">
            {`Our approach combines advanced sentiment analysis with a user-friendly interface, making it easy for researchers to access and interpret citation sentiment data. Here's what sets us apart:`}
          </p>
          <ol className="pl-4 py-3 flex flex-col gap-3">
            <li>
              <span className="font-medium text-lg">
                1 - User-Centric Design:
              </span>
              <span className="text-lg">{` Our platform is designed with researchers in mind, offering intuitive tools and visualizations that make data interpretation straightforward and insightful.`}</span>
            </li>
            <li>
              <span className="font-medium text-lg">
                2 - Comprehensive Coverage:
              </span>
              <span className="text-lg">{` We cover a wide range of academic disciplines and sources, providing a broad perspective on citation sentiment across different fields of study.`}</span>
            </li>
            <li>
              <span className="font-medium text-lg">
                3 - Continuous Improvement:
              </span>
              <span className="text-lg">{` We are committed to constantly refining and enhancing our tools based on user feedback and advancements in technology.`}</span>
            </li>
          </ol>
        </div>
        <div>
          <h1 className="font-bold text-xl md:text-2xl mt-5 pl-4">
            Join Us in Enhancing Academic Understanding
          </h1>
          <p className="pl-4 mt-2 text-lg">
            {`At CiteSentiment, we invite you to be part of our mission to bring clarity and insight to the world of academic citations. Whether you are a researcher looking to gain a deeper understanding of citation sentiment, a mentor seeking to guide the next generation of scholars, or a supporter who believes in the power of informed research, there's a place for you in our community.`}
            <br />
            {`Together, we can advance academic knowledge, foster collaboration, and create a more transparent and connected scholarly environment. Join us in making citation sentiment analysis accessible and impactful.`}
            <br />
            {`Thank you for your support, and welcome to CiteSentiment.`}
          </p>
        </div>
        <div>
          <h1 className="font-bold text-xl md:text-2xl mt-5 pl-4">Our Team</h1>
          <p className="pl-4 mt-2 text-lg">
            {`Meet the dedicated team behind CiteSentiment:`}
          </p>
          <ul className="pl-4 py-3 flex flex-col gap-3">
            <li className="font-medium text-lg">
              Dr. Afsheen Khalid, Supervisor
            </li>
            <li className="font-medium text-lg">Ajmal Wali, Team Lead</li>
            <li className="font-medium text-lg">Sayed Ahmad, Team Member</li>
            <li className="font-medium text-lg">
              Abdullah Arsalai, Team Member
            </li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold text-xl md:text-2xl mt-5 pl-4">
            Contact Us
          </h1>
          <p className="pl-4 mt-2 text-lg">
            {`Have questions or want to get involved? Contact us at contact@citesentiment.com.`}
          </p>
        </div>
        <ul className="my-10 pl-4">
          <li className="font-bold text-lg">CiteSentiment</li>
          <li className="underline hover:opacity-50">
            <a href="www.citesentiment.com" rel="noreferrer" target="_blank">
              www.citesentiment.com
            </a>
          </li>
          <li>contact@citesentiment.com</li>
        </ul>
      </div>
    </div>
  );
}
