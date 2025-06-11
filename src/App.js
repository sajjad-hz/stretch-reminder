import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaPlay, 
  FaStop, 
  FaCog, 
  FaTimes, 
  FaMinus,
  FaDumbbell,
  FaClock,
  FaEye,
  FaWalking,
  FaHeart
} from 'react-icons/fa';

const { ipcRenderer } = window.require('electron');

const AppContainer = styled.div`
  height: 97vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: auto;
`;

const TitleBar = styled.div`
  height: 32px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  -webkit-app-region: drag;
  user-select: none;
`;

const TitleBarButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  -webkit-app-region: no-drag;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MainContent = styled.div`
  padding: 24px;
  height: calc(100vh - 32px);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  opacity: 0.9;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
  
  option {
    background: #667eea;
    color: white;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button`
  flex: 1;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  ${props => props.primary && `
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #45a049, #3d8b40);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }
  `}
  
  ${props => props.secondary && `
    background: linear-gradient(135deg, #f44336, #d32f2f);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #d32f2f, #c62828);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
`;

const StatusCard = styled(Card)`
  text-align: center;
`;

const StatusText = styled.p`
  font-size: 16px;
  margin: 0 0 8px 0;
  font-weight: 500;
`;

const StatusSubtext = styled.p`
  font-size: 14px;
  opacity: 0.7;
  margin: 0;
`;

const SuggestionsList = styled.div`
  display: grid;
  gap: 12px;
`;

const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 4px solid rgba(255, 255, 255, 0.3);
`;

const SuggestionIcon = styled.div`
  font-size: 16px;
  opacity: 0.8;
`;

const SuggestionText = styled.span`
  font-size: 14px;
  line-height: 1.4;
`;

const stretchSuggestions = [
  { icon: <FaEye />, text: "Look away from screen every 20 minutes" },
  { icon: <FaDumbbell />, text: "Neck stretches: Slowly tilt your head side to side" },
  { icon: <FaDumbbell />, text: "Shoulder rolls: Roll your shoulders forward and backward" },
  { icon: <FaDumbbell />, text: "Wrist stretches: Extend your arms and flex your wrists" },
  { icon: <FaDumbbell />, text: "Standing stretches: Reach up and stretch your arms" },
  { icon: <FaWalking />, text: "Take a short walk around your workspace" },
  { icon: <FaHeart />, text: "Deep breathing: Take 5 deep breaths" },
  { icon: <FaClock />, text: "Stand up and do some gentle leg stretches" }
];

function App() {
  const [settings, setSettings] = useState({
    intervalMinutes: 30,
    startTime: '09:00',
    endTime: '17:00',
    isRunning: false
  });
  const [nextReminder, setNextReminder] = useState('');

  useEffect(() => {
    // Load settings on app start
    loadSettings();
    
    // Listen for IPC messages from main process
    ipcRenderer.on('show-reminder', handleShowReminder);
    ipcRenderer.on('start-reminders', handleStartReminders);
    ipcRenderer.on('stop-reminders', handleStopReminders);
    
    return () => {
      ipcRenderer.removeAllListeners('show-reminder');
      ipcRenderer.removeAllListeners('start-reminders');
      ipcRenderer.removeAllListeners('stop-reminders');
    };
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await ipcRenderer.invoke('get-settings');
      setSettings(savedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      await ipcRenderer.invoke('save-settings', newSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleStartReminders = async () => {
    const newSettings = { ...settings, isRunning: true };
    await saveSettings(newSettings);
    await ipcRenderer.invoke('start-reminder-timer', settings.intervalMinutes);
    
    // Calculate next reminder time
    const now = new Date();
    const nextTime = new Date(now.getTime() + settings.intervalMinutes * 60000);
    setNextReminder(nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const handleStopReminders = async () => {
    const newSettings = { ...settings, isRunning: false };
    await saveSettings(newSettings);
    await ipcRenderer.invoke('stop-reminder-timer');
    setNextReminder('');
  };

  const handleShowReminder = async () => {
    await ipcRenderer.invoke('show-notification', 
      '💪 Time to Stretch!', 
      'Take a break and do some stretches!'
    );
    
    // Calculate next reminder time
    const now = new Date();
    const nextTime = new Date(now.getTime() + settings.intervalMinutes * 60000);
    setNextReminder(nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const handleMinimize = () => {
    ipcRenderer.send('minimize-window');
  };

  const handleClose = () => {
    ipcRenderer.send('close-window');
  };

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return (
    <AppContainer>
      <TitleBar>
        <div>Stretch Reminder</div>
        <div>
          <TitleBarButton onClick={handleMinimize}>
            <FaMinus />
          </TitleBarButton>
          <TitleBarButton onClick={handleClose}>
            <FaTimes />
          </TitleBarButton>
        </div>
      </TitleBar>
      
      <MainContent>
        <Header>
          <Title>
            <FaDumbbell />
            Stretch Reminder
          </Title>
          <Subtitle>Stay healthy and productive</Subtitle>
        </Header>

        <Card>
          <CardTitle>
            <FaCog />
            Settings
          </CardTitle>
          
          <FormGroup>
            <Label>Reminder Interval (minutes)</Label>
            <Select 
              value={settings.intervalMinutes}
              onChange={(e) => handleSettingChange('intervalMinutes', parseInt(e.target.value))}
            >
              <option value={1}>1 minutes</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={20}>20 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Work Hours</Label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Input
                type="time"
                value={settings.startTime}
                onChange={(e) => handleSettingChange('startTime', e.target.value)}
                style={{ flex: 1 }}
              />
              <Input
                type="time"
                value={settings.endTime}
                onChange={(e) => handleSettingChange('endTime', e.target.value)}
                style={{ flex: 1 }}
              />
            </div>
          </FormGroup>
        </Card>

        <StatusCard>
          <CardTitle>
            <FaClock />
            Status
          </CardTitle>
          <StatusText>
            {settings.isRunning ? 'Reminders are running' : 'Reminders are stopped'}
          </StatusText>
          {nextReminder && (
            <StatusSubtext>Next reminder: {nextReminder}</StatusSubtext>
          )}
          
          <ButtonGroup>
            <Button 
              primary 
              onClick={handleStartReminders}
              disabled={settings.isRunning}
            >
              <FaPlay />
              Start
            </Button>
            <Button 
              secondary 
              onClick={handleStopReminders}
              disabled={!settings.isRunning}
            >
              <FaStop />
              Stop
            </Button>
          </ButtonGroup>
        </StatusCard>

        <Card>
          <CardTitle>
            <FaDumbbell />
            Stretch Suggestions
          </CardTitle>
          <SuggestionsList>
            {stretchSuggestions.map((suggestion, index) => (
              <SuggestionItem key={index}>
                <SuggestionIcon>{suggestion.icon}</SuggestionIcon>
                <SuggestionText>{suggestion.text}</SuggestionText>
              </SuggestionItem>
            ))}
          </SuggestionsList>
        </Card>
      </MainContent>
    </AppContainer>
  );
}

export default App; 