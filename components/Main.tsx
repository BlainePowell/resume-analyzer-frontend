import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import CircularProgress from "../components/ProgressCircle";
import DragAndDropFileUpload from "./DragAndDrop";

const Main = () => {
  const [analysis, setAnalysis] = useState<string>("");
  const [summaryToDisplay, setSummary] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [strengths, setStrengths] = useState<any[]>([]);
  const [weakness, setWeakness] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (file: any) => {
    setAnalysis("");
    setError("");

    handleUpload(file);
  };

  const handleUpload = async (file: any) => {
    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const {
        resume_score,
        things_done_well,
        areas_for_improvement,
        full_analysis,
        summary,
      } = response.data;

      setStrengths(things_done_well);
      setWeakness(areas_for_improvement);
      setScore(resume_score);
      setSummary(summary);
      setAnalysis(full_analysis);
    } catch (err) {
      setError("Error analyzing the file.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 w-full flex flex-col items-center py-32 max-w-[2000px]">
      <h1 className="text-2xl font-bold mb-4">
        Upload Your Resume for AI Analysis
      </h1>
      <DragAndDropFileUpload
        handleFileChange={handleFileChange}
        loading={loading}
        error={error}
      />
      {score !== 0 && score && (
        <div className="flex flex-wrap md:flex-nowrap space-x-3 items-stretch justify-center w-3/4">
          <div className="mt-6 p-6 bg-white shadow-md flex items-start justify-start flex-row rounded-lg min-w-[250px] md:w-1/5 w-full">
            <div className="flex flex-col space-y-3 items-start justify-start">
              <h1 className="text-2xl font-bold text-black">Rating</h1>
              <CircularProgress value={score} />
            </div>
          </div>
          <div className="w-full mt-6 p-6 bg-white shadow-md flex items-start justify-center flex-wrap lg:flex-nowrap rounded-lg">
            <div className="flex flex-col items-start justify-start w-full min-w-[300px]">
              <h1 className="text-2xl font-bold text-black pb-3">Strengths</h1>
              <div className="flex flex-row items-start justify-start flex-wrap">
                {strengths.map((strength, s) => (
                  <div
                    className="py-1 px-2 rounded-lg flex items-center justify-center bg-gray-200 shadow-md mr-4 mt-4"
                    key={s}
                  >
                    <p className="text-black/80">{strength}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full min-w-[150px]">
              <h1 className="text-2xl font-bold text-black pb-3">
                Needs Improvement
              </h1>
              <div className="flex flex-row items-start justify-start flex-wrap">
                {weakness.map((weak, w) => (
                  <div
                    className="py-1 px-2 rounded-lg flex items-center justify-center bg-gray-200 shadow-md mr-4 mt-4"
                    key={w}
                  >
                    <p className="text-black/80">{weak}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {analysis && (
        <div className="mt-3 p-6 bg-white shadow-md rounded-lg w-3/4">
          {summaryToDisplay && (
            <div className="flex flex-col space-y-3">
              <h1 className="text-2xl font-bold text-black">GPT Analysis</h1>
              <p className="text-gray-700">{summaryToDisplay}</p>
            </div>
          )}
          <ReactMarkdown
            components={{
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl font-bold text-black pb-3 pt-6"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="mt-2 text-gray-700" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside text-gray-700"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal list-outside text-gray-700"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => <li className="ml-4" {...props} />,
            }}
          >
            {analysis}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Main;
