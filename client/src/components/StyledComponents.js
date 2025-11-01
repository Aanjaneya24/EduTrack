import styled from 'styled-components';
import { Paper, Box, TextField, Button } from '@mui/material';

// Modern Card Container
export const StyledPaper = styled(Paper)`
  && {
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    background: #ffffff;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    }
  }
`;

// Page Header Container
export const PageHeader = styled(Box)`
  margin-bottom: 32px;
  
  h4 {
    font-size: 28px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 8px 0;
  }
  
  p {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
`;

// Modern Search Box
export const SearchContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const StyledSearchField = styled(TextField)`
  && {
    flex: 1;
    min-width: 300px;
    
    .MuiOutlinedInput-root {
      border-radius: 12px;
      background: #f8f9fa;
      transition: all 0.3s ease;
      
      &:hover {
        background: #ffffff;
      }
      
      &.Mui-focused {
        background: #ffffff;
        
        fieldset {
          border-color: #A78BFA;
          border-width: 2px;
        }
      }
      
      fieldset {
        border-color: transparent;
      }
    }
    
    .MuiInputLabel-root {
      &.Mui-focused {
        color: #A78BFA;
      }
    }
  }
`;

// Modern Action Buttons
export const ActionButton = styled(Button)`
  && {
    border-radius: 12px;
    padding: 10px 24px;
    text-transform: none;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
`;

export const PrimaryButton = styled(ActionButton)`
  && {
    background: linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
    }
  }
`;

export const SecondaryButton = styled(ActionButton)`
  && {
    background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
    }
  }
`;

export const SuccessButton = styled(ActionButton)`
  && {
    background: linear-gradient(135deg, #34D399 0%, #10B981 100%);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    }
  }
`;

export const DangerButton = styled(ActionButton)`
  && {
    background: linear-gradient(135deg, #F87171 0%, #EF4444 100%);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
    }
  }
`;

// Table Container
export const TableContainer = styled(StyledPaper)`
  && {
    padding: 0;
    overflow: hidden;
    
    .MuiTable-root {
      min-width: 650px;
    }
    
    .MuiTableHead-root {
      background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
      
      .MuiTableCell-head {
        font-weight: 600;
        color: #374151;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 20px 16px;
        border-bottom: 2px solid #A78BFA;
      }
    }
    
    .MuiTableBody-root {
      .MuiTableRow-root {
        transition: all 0.2s ease;
        
        &:hover {
          background: #F9FAFB;
          transform: scale(1.01);
        }
        
        &:last-child .MuiTableCell-root {
          border-bottom: none;
        }
      }
      
      .MuiTableCell-root {
        padding: 16px;
        color: #1f2937;
        font-size: 14px;
      }
    }
  }
`;

// Stats Card
export const StatsCard = styled(Box)`
  background: ${props => props.gradient || 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)'};
  border-radius: 16px;
  padding: 24px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }
  
  p {
    font-size: 14px;
    opacity: 0.9;
    margin: 0;
  }
`;

// Form Container
export const FormContainer = styled(StyledPaper)`
  && {
    max-width: 800px;
    margin: 0 auto;
    
    .MuiTextField-root {
      margin-bottom: 20px;
      
      .MuiOutlinedInput-root {
        border-radius: 12px;
        
        &.Mui-focused fieldset {
          border-color: #A78BFA;
          border-width: 2px;
        }
      }
      
      .MuiInputLabel-root.Mui-focused {
        color: #A78BFA;
      }
    }
  }
`;

// Info Section
export const InfoSection = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 24px 0;
`;

export const InfoItem = styled(Box)`
  padding: 16px;
  background: #F9FAFB;
  border-radius: 12px;
  border-left: 4px solid ${props => props.color || '#A78BFA'};
  
  label {
    font-size: 12px;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: block;
    margin-bottom: 8px;
  }
  
  .value {
    font-size: 16px;
    color: #1F2937;
    font-weight: 500;
  }
`;

// Empty State
export const EmptyState = styled(Box)`
  text-align: center;
  padding: 60px 20px;
  
  svg {
    font-size: 80px;
    color: #D1D5DB;
    margin-bottom: 16px;
  }
  
  h3 {
    font-size: 20px;
    color: #6B7280;
    margin: 0 0 12px 0;
  }
  
  p {
    font-size: 14px;
    color: #9CA3AF;
    margin: 0;
  }
`;

// Badge Component
export const Badge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch(props.variant) {
      case 'success': return '#D1FAE5';
      case 'error': return '#FEE2E2';
      case 'warning': return '#FEF3C7';
      case 'info': return '#DBEAFE';
      default: return '#F3E8FF';
    }
  }};
  color: ${props => {
    switch(props.variant) {
      case 'success': return '#065F46';
      case 'error': return '#991B1B';
      case 'warning': return '#92400E';
      case 'info': return '#1E40AF';
      default: return '#6B21A8';
    }
  }};
`;

// Loading Overlay
export const LoadingOverlay = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  
  .MuiCircularProgress-root {
    color: #A78BFA;
  }
`;
