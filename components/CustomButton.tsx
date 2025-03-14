import { TouchableOpacity, Text } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: object;
  textStyles?: object;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[containerStyles, isLoading ? { opacity: 0.5 } : {}]}
      disabled={isLoading}
    >
        <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
