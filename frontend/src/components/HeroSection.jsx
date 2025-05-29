import React, { useState, useEffect } from "react";
import backToSchools from "../assets/back-to-school.jpeg";
import axios from "axios";
import { BASE_URL } from "../base_url";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setIsLoading(true);
        const [classesRes, subjectsRes] = await Promise.all([
          axios.get(`${BASE_URL}/classes`),
          axios.get(`${BASE_URL}/subjects`),
        ]);
        setClasses(classesRes.data);
        setSubjects(subjectsRes.data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const params = {
        query: searchQuery,
        classId: selectedClass,
        subjectId: selectedSubject,
      };

      Object.keys(params).forEach(
        (key) => params[key] === "" && delete params[key]
      );

      const response = await axios.get("/api/books/search", { params });
      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-blue-50">
      <div className="container m-auto px-6 md:px-12 lg:pt-[4.8rem] lg:px-7">
        <div className="flex items-center flex-wrap px-2 md:px-0">
          <div className="relative lg:w-6/12 lg:py-24 xl:py-32">
            <h1 className="font-bold text-4xl text-blue-900 md:text-5xl lg:w-10/12">
              Empower Your Learning Journey
            </h1>
            <form onSubmit={handleSearch} className="w-full mt-12">
              <div className="relative flex p-1 rounded-full bg-white border border-blue-200 shadow-md md:p-2">
                <input
                  placeholder="Search for books, authors, or topics"
                  className="w-full p-4 rounded-full"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  title="Search books"
                  className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-blue-200 to-blue-300 hover:to-blue-300 active:from-blue-400 focus:from-blue-400 md:px-12"
                  disabled={isLoading}
                >
                  <span className="hidden text-blue-900 font-semibold md:block">
                    {isLoading ? "Searching..." : "Search"}
                  </span>
                </button>
              </div>

              {/* Filters Section */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                    Class/Category
                  </label>
                  <select
                    id="class"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <option value="">All Classes</option>
                    {classes.map((classItem) => (
                      <option key={classItem.id} value={classItem.id}>
                        {classItem.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
            <p className="mt-8 text-gray-700 lg:w-10/12">
              Unlock the knowledge you need to succeed.{" "}
              <a href="#shop" className="text-blue-700">
                Shop Now
              </a>{" "}
              and discover books that inspire and educate.
            </p>
          </div>
          <div className="">
            <img
              src={backToSchools}
              className="ml-20 relative h-[400px] w-full object-cover rounded-lg shadow-lg lg:h-[500px]"
              alt="book illustration"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;