import Reveal from "../animations/Reveal";

const AboutMe = () => {
  return (
    <section className="max-w-6xl mx-auto px-3 xl:px-0 pb-20">
      <h1 className="text-4xl text-center font-semibold pb-10 pt-6">
        About Me
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* one */}
        <Reveal className="md:col-span-8 grid-box">
          <h3 className="grid-box-title">My Programming Journey</h3>
          <p>
            My journey into programming began out of curiosity. I was fascinated
            by how code editors used colorful themes to make code visually
            engaging. I started with HTML and CSS tutorials on YouTube, and
            gradually found myself drawn to JavaScript. That curiosity soon
            turned into passion.
          </p>
        </Reveal>

        {/* two */}
        <Reveal className="md:col-span-4 grid-box">
          <h3 className="grid-box-title">How I Learned Programming</h3>
          <p>
            Initially, I relied on free resources like YouTube playlists.
            However, I soon realized that having structured guidance and
            mentorship would help me grow faster. That’s when I decided to
            invest in professional courses.
          </p>
        </Reveal>

        {/* three */}
        <Reveal className="md:col-span-4 grid-box">
          <h3 className="grid-box-title">Projects I've Built</h3>
          <p>
            I’ve completed several full-stack projects including a Car Rental
            App, Recipe Book App, and a complete authentication system. I
            handled both frontend and backend development for each project.
          </p>
        </Reveal>

        {/* four */}
        <Reveal className="md:col-span-8 grid-box">
          <h3 className="grid-box-title">What I Enjoy Building</h3>
          <p>
            I love working on clean, responsive user interfaces with good UX.
            I'm especially drawn to projects involving API integration,
            authentication, and real-world functionality. I find true excitement
            in challenges — they push me to grow.
          </p>
        </Reveal>

        {/* five */}
        <Reveal className="md:col-span-4 row-span-2 grid-box">
          <h3 className="grid-box-title">Future Goals</h3>
          <p>
            Programming can be challenging, but I genuinely enjoy the process.
            My future plans include mastering TypeScript, Next.js, Python, and
            even exploring C++. My ultimate goal is to build a SaaS product as a
            full-stack developer.
          </p>
        </Reveal>

        {/* six */}
        <Reveal className="md:col-span-4 grid-box">
          <h3 className="grid-box-title">Skills & Tools</h3>
          <p>
            I specialize in the MERN stack — MongoDB, Express, React, and
            Node.js. I’m also experienced with Tailwind CSS, Firebase, JWT, and
            GitHub. React and Tailwind are my favorite tools for building modern
            UIs.
          </p>
        </Reveal>

        {/* seven */}
        <Reveal className="md:col-span-4 grid-box">
          <h3 className="grid-box-title">How I Solve Problems</h3>
          <p>
            When I run into issues, I start with Google and Stack Overflow. I
            also consult official documentation. If needed, I turn to YouTube or
            ChatGPT. My goal is always to understand the "why" behind a
            solution.
          </p>
        </Reveal>

        {/* eight */}
        <Reveal className="md:col-span-8 grid-box">
          <h3 className="grid-box-title">Outside of Programming</h3>
          <p>
            Outside of coding, I enjoy playing football, especially when I visit
            my village. When I’m in the city, I spend most of my time learning
            and sharpening my development skills — there's always something new
            to explore.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutMe;
