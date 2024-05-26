const Footer = () => {
  return (
    <div className="bg-dark-blue bg-opacity-70 text-white">
      <div className="max-w-7xl mx-auto mt-10 px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Personal Information</h3>
          <p className="">
            Hello! I'm Md Abu Sayed, a passionate software developer with a keen interest in
            creating dynamic and user-friendly applications. I have a solid foundation in various
            programming languages and frameworks, which allows me to build robust and efficient
            solutions.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Educational Background</h3>
          <p className="">
            <strong>Computer Science & Engineering</strong>
          </p>
          <p className="">Hangzhou Normal University, Graduated in 2021</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Experience</h3>
          <p className="">
            <strong>Software Developer</strong>
          </p>
          <ul className="list-disc list-inside ">
            <li>Developed and maintained web applications using React, Node.js, and MongoDB.</li>
            <li>Collaborated with cross-functional teams to design and implement new features.</li>
            <li>Optimized application performance and improved user experience.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Technology Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="">
                <strong>Languages:</strong>
              </p>
              <ul className="list-disc list-inside ">
                <li>Tailwind CSS</li>
                <li>JavaScript</li>
                <li>Redux</li>
                <li>Next JS</li>
              </ul>
            </div>
            <div>
              <p className="">
                <strong>Frameworks:</strong>
              </p>
              <ul className="list-disc list-inside ">
                <li>React JS</li>
                <li>Node JS</li>
                <li>Express JS</li>
              </ul>
            </div>
            <div>
              <p className="">
                <strong>Databases:</strong>
              </p>
              <ul className="list-disc list-inside ">
                <li>MongoDB</li>
              </ul>
            </div>
            <div>
              <p className="">
                <strong>Tools:</strong>
              </p>
              <ul className="list-disc list-inside ">
                <li>Adobe XD</li>
                <li>Figma</li>
                <li>Git</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
