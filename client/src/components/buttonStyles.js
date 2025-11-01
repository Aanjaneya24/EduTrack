import styled from 'styled-components';
import { Button } from '@mui/material';

export const RedButton = styled(Button)`
  && {
    background-color: #f00;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    background-color: #000000;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #212020;
      border-color: #212020;
      box-shadow: none;
    }
  }
`;

export const DarkRedButton = styled(Button)`
  && {
    background-color: #650909;
    color: white;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    background-color: #080a43;
    color: #fff;
    &:hover {
      background-color: #0a1e82;
    }
  }
`;

export const PurpleButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: #fff;
    border-radius: 12px;
    padding: 10px 24px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
    }
  }
`;

export const LightPurpleButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: #fff;
    border-radius: 12px;
    padding: 10px 24px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    transition: all 0.3s ease;
    text-transform: none;
    &:hover {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: #fff;
    border-radius: 12px;
    padding: 10px 24px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(16, 185, 129, 0.4);
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #92400e 0%, #78350f 100%);
    color: white;
    border-radius: 12px;
    padding: 10px 24px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(146, 64, 14, 0.3);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #78350f 0%, #451a03 100%);
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(146, 64, 14, 0.4);
    }
  }
`;

export const IndigoButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
    color: white;
    border-radius: 12px;
    padding: 10px 24px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(79, 70, 229, 0.3);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #4338ca 0%, #3730a3 100%);
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(79, 70, 229, 0.4);
    }
  }
`;
