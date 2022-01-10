


const FormHeader = ({ header, name }: any) => {
  return (
      <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
              {name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {header.label ? header.label: ''}
          </p>
      </div>
  );
};

export default FormHeader;
