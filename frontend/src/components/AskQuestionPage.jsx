import QuestionForm from './QuestionForm';

export default function AskQuestionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Ask a Question</h1>
      <QuestionForm refreshQuestions={() => {}} />
    </div>
  );
}
