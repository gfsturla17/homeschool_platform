import styled from "styled-components";
import Modal from "react-modal";

export const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LoginWrapper = styled.div`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
`;

export const Link = styled.span`
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        font-weight: bold;
    }
`;

export const SignupModal = styled(Modal)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px; /* adjust the width to your liking */
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .teacher-link, .parent-link {
        cursor: pointer;
    }

    .teacher-link:hover, .parent-link:hover {
        text-decoration: underline;
        font-weight: bold;
    }

    .submit-button {
        background-color: #28a745;
        color: white;
        padding: 10px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        width: 100%;
    }

    .forgot-password-text {
        color: #87CEEB;
        margin-bottom: 10px;
    }

    .toggle-signup-button {
        background-color: #0070e0;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
    }
`;