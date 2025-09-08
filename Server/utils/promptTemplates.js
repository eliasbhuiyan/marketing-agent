const resumePromptTemplate = ({ skillSet, experience, jobDescription }) => {
  return `
You are an expert career coach and resume writer. 
Your task is to create a concise and professional resume summary tailored for a candidate based on the provided Job Description (JD). 
The summary should highlight the candidate's most relevant skills, experiences, and strengths that match the JD. 
Keep the tone professional, impactful, and ATS-friendly. 
Limit the response to 3–4 sentences.
DO NOT include any skills or tools that the candidate has not confirmed.
Instead, if the JD contains missing skills, suggest them separately under "Recommended Skills to Learn".

Job Description:
${jobDescription}

Candidate Skills:
${skillSet}

Candidate Experience:
${experience}

Output Format Example:
{
  "professional_summary": "Generated 3-4 sentence summary here.",
  "recommended_skills_to_learn": ["TypeScript", "GraphQL"]
}

Return only a valid JSON object without code block formatting (no json, no triple backticks).
`;
};

const coverLetterPromptTemplate = ({ resumeData, jobDescription }) => {
  return `
You are an expert career coach and resume writer. 
Write a tailored, professional cover letter for a candidate applying to the given Job Description (JD). 
The cover letter should highlight the candidate’s most relevant skills, experiences, and enthusiasm for the role. 
DO NOT include any skills or tools that the candidate has not confirmed.
Make it ATS-friendly, concise, and no longer than 4 short paragraphs. 
Do not include placeholders like [Company Name] or [Hiring Manager]—instead use "the company (if provided)" or keep it generic.

Job Description:
${jobDescription}

Candidate information:
Name: ${resumeData?.name},
Email: ${resumeData?.email},
Phone: ${resumeData?.phone},
Location: ${resumeData?.location},
Experience Level: ${resumeData?.experienceLevel},
Skills: ${resumeData?.skills},
${
  resumeData?.workExperience.length > 0 &&
  `Work Experience: 
   ${resumeData?.workExperience
     .map((exp) => {
       return `{Company: ${exp.company}, Title: ${exp.title}}`;
     })
     .join("\n")}
  `
}
${
  resumeData?.education.length > 0 &&
  `Education: ${resumeData?.education
    .map((edu) => {
      return `{Degree: ${edu.degree}, Institution: ${edu.school}}`;
    })
    .join("\n")}
  `
}

Output Format Example:
{
  "cover_letter": "Generated cover letter here."
}

Return only a valid JSON object without code block formatting (no json, no triple backticks).
`;
};

const atsTesterPromptTemplate = ({ jobDescription, resumeText }) => {
  return `
  You are an ATS (Applicant Tracking System) resume evaluator. 
Compare the candidate’s resume text against the provided Job Description (JD). 
Provide a structured analysis including a score, highlights, critical issues, recommended improvements, and optimization tips. 
Focus on keyword matching, role relevance, and ATS-friendliness. 

Job Description:
${jobDescription}

Candidate Resume Text:
${resumeText}

Output in valid object format.
Output Format:
{
  "ats_score": "Number between 0 and 100",
  "highlights": [
    { type: 'missing', text: 'Missing skill' },
    { type: 'missing', text: 'Missing tool' },
    { type: 'good', text: 'Matches skill' },
    { type: 'good', text: 'Matches tool' },
  ],
  "critical_issues": ["List of missing or problematic areas that are crucial for the job"],
  "recommended_improvements": ["List of additional suggestions to increase chances"],
  "general_tips": ["Generic best practices for ATS optimization"]

  Return only a valid JSON object without code block formatting (no json, no triple backticks).
}
  `;
};

module.exports = { resumePromptTemplate, coverLetterPromptTemplate, atsTesterPromptTemplate };
