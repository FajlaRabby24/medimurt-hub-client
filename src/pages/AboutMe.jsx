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
            My programming journey started a long time ago, an interesting thing
            is that the reason behind my coming to programming is that I
            actually like programming since the different themes in the code
            editor show the codes in different colors. First I started with HTML
            CSS which I watched on YouTube and then I got interested in
            JavaScript. From then on, I actually got more interested in doing
            something with programming.
          </p>
        </Reveal>

        {/* two */}
        <Reveal className="md:col-span-4 grid-box">
          <h3 className="grid-box-title">How I Learned Programming</h3>
          <p>
            At first, I learned by watching various playlists on YouTube, but at
            one point I realized that there were very few opportunities to get
            help here, so I thought, let's actually take a course later.
          </p>
        </Reveal>

        {/* three */}
        <Reveal className="md:col-span-4 grid-box">
          <h3 className="grid-box-title">Projects I've Built</h3>
          <p>
            I have done more than 3 projects till now — MediMurt Hub, Car Rental
            App, Recipe Book App and authentication system. In each project I
            have handled the frontend and backend myself.
          </p>
        </Reveal>

        {/* four */}
        <Reveal className="md:col-span-8 grid-box">
          <h3 className="grid-box-title">What I Enjoy Building</h3>
          <p>
            I love working on projects where UI/UX is important. I like to
            create minimalist and responsive designs. I am also interested in
            API integration and authentication-related work. At the same time, I
            also love challenging work because there is little interest in work
            that does not have challenges.
          </p>
        </Reveal>

        {/* five */}
        <Reveal className="md:col-span-4 row-span-2 grid-box">
          <h3 className="grid-box-title">Future Goals</h3>
          <p>
            Although programming is difficult, I enjoy learning it, so I have
            made plans to learn Next.js, TypeScript, Socket.io, Python, and C++
            in the future. My goal is to create a SaaS app as a full-stack
            developer.
          </p>
        </Reveal>

        {/* six */}
        <Reveal className="md:col-span-4 grid-box">
          <h3 className="grid-box-title">My Skills & Tools</h3>
          <p>
            I work with the MERN Stack (MongoDB, Express, React, Node.js). I am
            also proficient in Tailwind CSS, Firebase, JWT, Mongoose and GitHub
            version control.
          </p>
        </Reveal>

        {/* seven */}
        <Reveal className="md:col-span-4 grid-box">
          <h3 className="grid-box-title">How I Solve Problems</h3>
          <p>
            When I encounter a problem, I first look at Problem after watching,
            I try to understand what the problem is and how to solve it. If I
            can't solve it then I look at the ChatGPT and other AI tools and
            also Google, Stack overflow, youtube.
          </p>
        </Reveal>

        {/* eight */}
        <Reveal className="md:col-span-8 grid-box">
          <h3 className="grid-box-title">What's good without programming</h3>
          <p>
            Apart from coding, I like to play football, sometimes when I go to
            my village, I play football, and I also use other activities.
            Besides, when I'm in the city, most of the time I spend on my
            computer screen to gain knowledge, especially programming related
            knowledge.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutMe;
