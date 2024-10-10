import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import * as Speech from 'expo-speech'; // Text-to-speech
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon library
import { AuthContext } from '../context/authContext';

const ChatbotScreen = () => {
    const [messages, setMessages] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false); // State to track if speech is ongoing
    const [lastBotMessage, setLastBotMessage] = useState(''); // State to store the last bot message
    const [isTyping, setIsTyping] = useState(false); // State to track if the bot is typing
    const [state] = useContext(AuthContext);

    useEffect(() => {
        // Add an initial message from the bot
        const initialMessage = {
            _id: Math.random().toString(),
            text: "Hello! I'm here to assist you with any questions about maternal health. How can I help you today?",
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'MomBuddy',
            },
        };
        setMessages([initialMessage]);
        setLastBotMessage(initialMessage.text); // Store the initial bot message
    }, []);

    const handleSend = async (newMessages = []) => {
        const message = newMessages[0];
        setMessages((previousMessages) => GiftedChat.append(previousMessages, message));

        // Show the typing indicator
        setIsTyping(true);

        // Customize the message for maternal health
        const userMessage = message.text;
        const response = await fetchMaternalHealthResponse(userMessage);

        // Hide the typing indicator after receiving a response
        setIsTyping(false);

        if (response) {
            const botMessage = {
                _id: Math.random().toString(),
                text: response,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'MomBuddy',
                },
            };
            setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage));
            setLastBotMessage(botMessage.text); // Store the latest bot message
        }
    };

    const fetchMaternalHealthResponse = async (question) => {
        try {
          const response = await axios.post(
            '/chatbot/chatbot-response',
            { userMessage: question },
            { headers: { Authorization: `Bearer ${state.token}` } }  // Send the token for authorization
          );
      
          return response.data.botResponse; // Extract the bot response from the backend
        } catch (error) {
          console.error('Error fetching maternal health response:', error);
          return "I'm sorry, I couldn't fetch the information at this time.";
        }
    };

    // Function to replay the bot's last message via text-to-speech
    const replayBotMessage = () => {
        if (isSpeaking) {
            // If speech is currently active, stop it
            Speech.stop();
            setIsSpeaking(false); // Update state to indicate that speech has stopped
        } else {
            // If speech is not active, speak the last bot message
            Speech.speak(lastBotMessage, {
                onDone: () => setIsSpeaking(false), // Set isSpeaking to false when speech is done
                onStopped: () => setIsSpeaking(false) // Handle the case when speech is manually stopped
            });
            setIsSpeaking(true); // Update state to indicate that speech is active
        }
    };
    // Customize bubble to include mic icon at the bottom right corner
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: { backgroundColor: '#0000dd' },
                    left: { backgroundColor: '#e2e8ff' }
                }}
                containerStyle={{
                    paddingBottom: 10, // Ensure space for the mic icon at the bottom
                }}
                renderCustomView={() => (
                    props.currentMessage.user._id === 2 && (
                        <View style={{ position: 'absolute', right: 10, bottom: -10 }}>
                            <TouchableOpacity onPress={replayBotMessage}>
                                <Icon name="microphone" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>
                    )
                )}
            />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GiftedChat
                messages={messages}
                onSend={messages => handleSend(messages)}
                user={{
                    _id: 1,
                }}
                isTyping={isTyping} // Show typing indicator
                renderBubble={renderBubble} // Use custom bubble rendering
            />
        </SafeAreaView>
    );
};

export default ChatbotScreen;
