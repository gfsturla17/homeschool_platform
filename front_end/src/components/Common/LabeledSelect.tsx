import Select from 'react-select';
import styled from "styled-components";


interface Props {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const Container = styled.div`
    position: relative;
    width: 80%;
    margin: 20px auto;
    padding: 16px 0; // Add padding to match the LabeledTextInput
`;

const LabeledSelect: React.FC<Props> = ({ options, value, onChange, placeholder }) => {
  return (
    <Container>
      <Select
        options={options}
        value={options.find((option) => option.value === value)}
        onChange={(option) => onChange(option?.value || '')}
        isClearable
        placeholder={placeholder}
        filterOption={(option, inputValue) => {
          return option.label.toLowerCase().includes(inputValue.toLowerCase());
        }}
        styles={{
          container: (provided) => ({
            ...provided,
            width: '100%',
            padding: '0',
            border: 'none',
          }),
          control: (provided) => ({
            ...provided,
            height: '40px',
            width: '100%',
            padding: '0 12px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }),
        }}
      />
    </Container>
  );
};

export default LabeledSelect;