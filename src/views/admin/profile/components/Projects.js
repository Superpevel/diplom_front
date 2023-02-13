// Chakra imports
import { Text, useColorModeValue } from "@chakra-ui/react";
// Assets
import Project1 from "assets/img/profile/Project1.png";
import Project2 from "assets/img/profile/Project2.png";
import Project3 from "assets/img/profile/Project3.png";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Project from "views/admin/profile/components/Project";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Link,
  Menu,
  MenuList,
  Stack,
  useColorMode,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";

export default function Projects(props) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Проект для управления дверьми или СКУД систстема . 
      </Text>
      <Link 
      href={`${process.env.PUBLIC_URL}/#/admin/users`}
      >
      <Project
        boxShadow={cardShadow}
        mb='20px'
        image={Project1}
        ranking='1'
        link='#'
        title='Управление пользователями'
      />
      </Link>
      <Link 
      href={`${process.env.PUBLIC_URL}/#/admin/doors_log`}
      >
      <Project
        boxShadow={cardShadow}
        mb='20px'
        image={Project1}
        ranking='2'
        link='#'
        title='Просмотр логов дверей'
      />
      </Link>
      <Link 
      href={`${process.env.PUBLIC_URL}/#/admin/data-tables`}
      >
      <Project
        boxShadow={cardShadow}
        image={Project1}
        ranking='3'
        link='#'
        title='Управление дверьми'
      />
      </Link>
    </Card>
  );
}
