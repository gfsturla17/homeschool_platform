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
    padding: 0;
    margin: 20px auto;
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
        }}
      />
    </Container>
  );
};

export default LabeledSelect;