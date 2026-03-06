export function ResourceQuote({
  block,
}: {
  block: {
    name?: string;
    job?: string;
    paragraph: string | undefined;
    type: "resource.quote";
  };
}) {
  const { name, job, paragraph } = block;
  return (
    <div className="mb-15 mt-10  space-y-8    rounded-[20px] font-medium! bg-bg-100 py-6 px-6">
      <svg
        width="70"
        height="70"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary-700"
      >
        <path
          d="M78.6047 54.8063C82.4529 54.8063 84.3769 56.7304 84.3769 60.5786V76.2278C84.3769 80.0759 82.4529 82 78.6047 82H63.7251C59.877 82 57.9529 80.0759 57.9529 76.2278V60.5786C57.9529 51.5995 58.8936 43.7749 60.7749 37.1048C62.7417 30.3491 66.5471 24.4486 72.1911 19.4032C74.0724 17.7784 75.6544 17.5647 76.9372 18.7619L82.7094 24.1493C83.9921 25.3465 83.6928 26.8002 81.8115 28.5105C78.904 31.076 76.5096 34.7959 74.6283 39.6702C72.8325 44.459 71.9346 49.5044 71.9346 54.8063H78.6047ZM36.2749 54.8063C40.1231 54.8063 42.0472 56.7304 42.0472 60.5786V76.2278C42.0472 80.0759 40.1231 82 36.2749 82H21.3954C17.5472 82 15.6231 80.0759 15.6231 76.2278V60.5786C15.6231 51.5995 16.5638 43.7749 18.4451 37.1048C20.4119 30.3491 24.2173 24.4486 29.8613 19.4032C31.7426 17.7784 33.3247 17.5647 34.6074 18.7619L40.3796 24.1493C41.6623 25.3465 41.363 26.8002 39.4817 28.5105C36.5742 31.076 34.1798 34.7959 32.2985 39.6702C30.5027 44.459 29.6048 49.5044 29.6048 54.8063H36.2749Z"
          fill="currentColor"
        />
      </svg>

      <div className="space-y-3">
        <p className="body-large text-black!"> {paragraph}</p>
        <div className="space-y-1 mt-6">
          {name && <p className="text-[18px] text-body font-medium!">{name}</p>}
          {job && <p className="body-small font-normal!">{job}</p>}
        </div>
      </div>
    </div>
  );
}
