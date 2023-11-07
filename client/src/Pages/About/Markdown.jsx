import React from "react";
import styles from "./Markdown.module.css";
const Markdown = () => {
  return (
    <div className={`${styles["markdown-body"]}`}>
      <h1 className={`${styles["markdown-h1"]}`}>CourseOverflow - About Us</h1>
      <h2 className={`${styles["markdown-h2"]}`}>Company's Journey</h2>
      <p className={`${styles["markdown-p"]}`}>
        CourseOverflow is a pioneering platform that has revolutionized the way
        students access educational resources by leveraging the vast pool of
        knowledge available on YouTube. With years of experience and a deep
        understanding of the challenges faced by students, CourseOverflow was
        founded in [year of establishment] with the aim to simplify the process
        of finding relevant educational content.
      </p>
      <h2 className={`${styles["markdown-h2"]}`}>Purpose and Goals</h2>
      <p className={`${styles["markdown-p"]}`}>
        Our mission at CourseOverflow is to provide students with convenient
        access to curated YouTube playlists specifically tailored to their
        course curriculums. We understand that traditional education can
        sometimes fall short in meeting all the unique learning needs of
        students. Therefore, our purpose is to bridge this gap by offering a
        service that streamlines the process of discovering and utilizing
        relevant educational resources on YouTube.
      </p>
      <p className={`${styles["markdown-p"]}`}>
        Our ultimate goal is to empower students with enhanced learning
        opportunities and support their academic growth. By doing so, we aim to
        become the go-to platform for students seeking supplementary educational
        content.
      </p>
      <h2 className={`${styles["markdown-h2"]}`}>Introduction to the Team</h2>
      <p className={`${styles["markdown-p"]}`}>
        Behind CourseOverflow is a team of highly skilled and passionate
        individuals who share a common vision: to revolutionize the way students
        learn and prepare for their exams. Our team is composed of technology
        enthusiasts who bring their expertise and dedication to provide the best
        possible support to students.
      </p>
      <h2 className={`${styles["markdown-h2"]}`}>Offerings</h2>
      <p className={`${styles["markdown-p"]}`}>
        At CourseOverflow, our key features are designed to simplify the process
        of finding and accessing relevant educational resources on YouTube:
      </p>
      <ul className={`${styles["markdown-ul"]}`}>
        <li className={`${styles["markdown-li"]}`}>
          Curriculum-based playlists: We create meticulously curated YouTube
          playlists tailored to the specific course curriculums provided by
          students.
        </li>
        <li className={`${styles["markdown-li"]}`}>
          Convenience: Our platform offers students an easily accessible and
          organized collection of educational videos.
        </li>
        <li className={`${styles["markdown-li"]}`}>
          Exam-oriented support: We provide students with a valuable resource
          for their exam preparation, offering a comprehensive range of
          educational content.
        </li>
        <li className={`${styles["markdown-li"]}`}>
          Time-saving: We eliminate the need for students to search for videos
          themselves.
        </li>
        <li className={`${styles["markdown-li"]}`}>
          Enhanced learning: CourseOverflow facilitates a more interactive and
          engaging learning experience.
        </li>
      </ul>
      <h2 className={`${styles["markdown-h2"]}`}>Customer Opinions</h2>
      <p className={`${styles["markdown-p"]}`}>
        Here's what some of our satisfied customers have to say about
        CourseOverflow:
      </p>
      <ul className={`${styles["markdown-ul"]}`}>
        <li className={`${styles["markdown-li"]}`}>
          "CourseOverflow revolutionized my study routine! The curated playlists
          saved me so much time, and the videos were exactly what I needed to
          supplement my learning." - John, University Student
        </li>
        <li className={`${styles["markdown-li"]}`}>
          "As an educator, I am thrilled to have CourseOverflow as a resource
          for my students. It's an invaluable tool that enhances their learning
          experience and helps them excel academically." - Sarah, High School
          Teacher
        </li>
      </ul>
      <h2 className={`${styles["markdown-h2"]}`}>Achievements</h2>
      <p className={`${styles["markdown-p"]}`}>
        Since our inception, CourseOverflow has achieved significant milestones
        and recognition in the education industry, including:
      </p>
      <ul className={`${styles["markdown-ul"]}`}>
        <li className={`${styles["markdown-li"]}`}>
          Collaborated with renowned educational institutions.
        </li>
        <li className={`${styles["markdown-li"]}`}>
          Received positive reviews and testimonials from students, teachers,
          and educational professionals.
        </li>
      </ul>
      <h2 className={`${styles["markdown-h2"]}`}>Call to Action</h2>

      <p className={`${styles["markdown-p"]}`}>
        Join CourseOverflow today and experience the ultimate solution for
        accessing relevant educational resources conveniently. Improve your
        learning, supplement your exam preparation, and unlock your academic
        potential with our curated YouTube playlists. Explore the vast world of
        knowledge on YouTube, personalized to your specific course curriculum.
        Together, let's redefine the way you learn!
      </p>
      <p className={`${styles["markdown-p"]}`}>
        Visit our website{" "}
        <a href="https://www.courseoverflow.com">CourseOverflow</a> now to get
        started!
      </p>
    </div>
  );
};

export default Markdown;
