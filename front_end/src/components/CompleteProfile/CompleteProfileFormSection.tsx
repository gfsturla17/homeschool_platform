// CompleteProfileFormSection HOC
import { NavigationControlButton } from "../Common/Buttons/NavigationControlButton";
import FlexContainer from "../Common/Containers/FlexContainer";
import SubmitButton from "../Common/Buttons/SubmitButton";
import React from "react";


interface Props {
  title: string;
  children: any;
  onPrevious?: any;
  onNext?: any;
  onSkip?: any;
  isLastStep: boolean;
}

export type Section = {
  title: string;
  component: React.ElementType;
  props: any;
};

const CompleteProfileFormSection = ({ title, children, onPrevious, onNext, onSkip, isLastStep }: Props) => {
  return (
    <div>
      <FlexContainer justifycontent="space-between" style={{ marginBottom: '20px' }}>
        <h2 style={{ textAlign: "center", flex: 1 }}>{title}</h2>
        {onSkip && <span style={{ color: "grey", cursor: 'pointer' }} onClick={onSkip}>Skip for now</span>}
      </FlexContainer>
      {children}
      <FlexContainer justifycontent="space-between">
        {onPrevious && <NavigationControlButton type="button" onClick={onPrevious}>Previous</NavigationControlButton>}
        <div style={{ flex: 1 }} />
        {isLastStep ? (
          <SubmitButton type="submit">Complete Profile</SubmitButton>
        ) : (
          <NavigationControlButton type="button" onClick={onNext}>Next</NavigationControlButton>
        )}
      </FlexContainer>
    </div>
  );
};

export default CompleteProfileFormSection;
