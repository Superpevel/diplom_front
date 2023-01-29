import {
    Flex,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Button,
    Input,
  } from "@chakra-ui/react";
  import React, { useEffect, useMemo, useState } from "react";
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
  import Pagination from "components/Pagination";
  
  // Custom components
  import Card from "components/card/Card";
  import Menu from "components/menu/MainMenu";
  export default function ColumnsTable(props) {
    const { columnsData, tableData } = props;
  
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
  
    const tableInstance = useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      initialState,
    } = tableInstance;
    initialState.pageSize = 5;
  
    async function GetDoors() {
      try {
        let res = await fetch("http://localhost:8007/api/doors/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json;",
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6InN0cmluZyIsInBhc3N3b3JkIjoic3RyaW5nIiwidXNlcl9pZCI6MX0.eOYE-WlCU16LfHnZdxHu7zhoDdaJxR9wVnTsdNltF8s",
          },
        });
        let resJson = await res.json();
        if (res.status === 200) {
          console.log("got doors");
          console.log(resJson);
          return resJson;
        } else {
          console.log("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }
  
    async function DeleteDoor(id) {
    try {
        let res = await fetch("http://localhost:8007/api/doors/", {
          method: "DELETE",
          body: JSON.stringify({
            id: id
          }),
          headers: {
            "Content-Type": "application/json;",
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6InN0cmluZyIsInBhc3N3b3JkIjoic3RyaW5nIiwidXNlcl9pZCI6MX0.eOYE-WlCU16LfHnZdxHu7zhoDdaJxR9wVnTsdNltF8s",
          },
        });
        if (res.status === 204) {
          console.log("door deleted");
        } else {
          console.log("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }
  
    const [pageNum, setPageNum] = useState(0);
  
    const page_size = 100
    
  
    function handleNextPage(page, page_size) {
        var url = `http://localhost:8007/api/doors/?limit=${page_size}&page=${page}`
  
        fetch(url)
        .then(response => response.json())
        .then(data => setDoorsData(data))
        setPageNum(pageNum+1)
      }
    function handlePreviousPage(page, page_size) {
      var url = `http://localhost:8007/api/doors/?limit=${page_size}&page=${page}`
  
      fetch(url)
      .then(response => response.json())
      .then(data => setDoorsData(data))
      setPageNum(pageNum-1)
    }
  
    const [doorsData, setDoorsData] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
        const data = await GetDoors();
        if (data) {
          setDoorsData(data);
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
  
    const [timer, setTimer] = useState(null)
  
    async function TimeOutPatch(arg,value,id){
  
      clearTimeout(timer)
      const newTimer = setTimeout(() => {
        PatchDoors(arg,value,id)
      }, 500)
  
      setTimer(newTimer)
    }
  
    async function PatchDoors(arg, value, id) {
      console.log("HELLO!", id)
      try {
        var bd = {};
        if (arg == 'rank'){
          value = Number(value)
        }
        bd[arg] = value;
        bd['id'] = id;
        let res = await fetch("http://localhost:8007/api/doors/", {
          body: JSON.stringify(bd),
          method: "PATCH",
          headers: {
            "Content-Type": "application/json;",
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6InN0cmluZyIsInBhc3N3b3JkIjoic3RyaW5nIiwidXNlcl9pZCI6MX0.eOYE-WlCU16LfHnZdxHu7zhoDdaJxR9wVnTsdNltF8s",
          },
        });
        let resJson = await res.json();
        if (res.status === 200) {
          console.log("got doors");
          console.log(resJson);
          return resJson;
        } else {
          console.log("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }
  
    return (
      <Card
        direction="column"
        w="150%"
        px="0px"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        {loading ? (
          <p>Loading Table...</p>
        ) : (
          <>
            <Flex px="25px" justify="space-between" mb="20px" align="center">
              <Text
                color={textColor}
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
              >
                Двери
              </Text>
              <Menu />
            </Flex>
            <Table
              {...getTableProps()}
              variant="simple"
              color="gray.500"
              mb="24px"
            >
              <Thead>
                  <Tr>
                      <Th
                        pe="10px"
                        borderColor={borderColor}
                      >
                        <Flex
                          justify="space-between"
                          align="center"
                          fontSize={{ sm: "10px", lg: "12px" }}
                          color="gray.400"
                        >
                          ID
                        </Flex>
                      </Th>
                      <Th
                        pe="10px"
                        borderColor={borderColor}
                      >
                        <Flex
                          justify="space-between"
                          align="center"
                          fontSize={{ sm: "10px", lg: "12px" }}
                          color="gray.400"
                        >
                          RANK
                        </Flex>
                      </Th>
                      <Th
                        pe="10px"
                        borderColor={borderColor}
                      >
                        <Flex
                          justify="space-between"
                          align="center"
                          fontSize={{ sm: "10px", lg: "12px" }}
                          color="gray.400"
                        >
                          IS Entry
                        </Flex>
                      </Th>
                      <Th
                        pe="10px"
                        borderColor={borderColor}
                      >
                        <Flex
                          justify="space-between"
                          align="center"
                          fontSize={{ sm: "10px", lg: "12px" }}
                          color="gray.400"
                        >
                          IS EXIT
                        </Flex>
                      </Th>
                      <Th
                        pe="10px"
                        borderColor={borderColor}
                      >
                        <Flex
                          justify="space-between"
                          align="center"
                          fontSize={{ sm: "10px", lg: "12px" }}
                          color="gray.400"
                        >
                          DELETE 
                        </Flex>
                      </Th>
                  </Tr>
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {doorsData &&
                  doorsData.map((el, index) => {
                    return (
                      <Tr key={index}>
                        <Td
                          fontSize={{ sm: "14px" }}
                          minW={{ sm: "150px", md: "200px", lg: "auto" }}
                          borderColor="transparent"
                        >
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            {el.id}
                          </Text>
                        </Td>
                        <Td
                          fontSize={{ sm: "14px" }}
                          minW={{ sm: "150px", md: "200px", lg: "auto" }}
                          borderColor="transparent"
                        >
                        <input type="text" defaultValue={el.rank} onChange={e => TimeOutPatch('rank', e.target.value, el.id)}/>
  
                        </Td>
                        <Td
                          fontSize={{ sm: "14px" }}
                          minW={{ sm: "150px", md: "200px", lg: "auto" }}
                          borderColor="transparent"
                        >
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            <input
                                  type="checkbox"
                                  name="period"
                                  defaultChecked={el.is_entry}
                                  onChange={e => TimeOutPatch('is_entry', e.target.checked, el.id)}
                            />
                          </Text>
                        </Td>
                        <Td
                          fontSize={{ sm: "14px" }}
                          minW={{ sm: "150px", md: "200px", lg: "auto" }}
                          borderColor="transparent"
                        >
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                          <input
                                  type="checkbox"
                                  name="period"
                                  defaultChecked={el.is_exit}
                                  onChange={e => TimeOutPatch('is_exit', e.target.checked, el.id)}
                            />
                          </Text>
                        </Td>
                        <Td>
                              <Button 
                                variant='darkBrand'
                                color='white'
                                fontSize='sm'
                                fontWeight='500'
                                borderRadius='70px'
                                px='24px'
                                py='5px'
                              onClick={() => DeleteDoor(el.id)}> DeleteDoor </Button>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
              <Button onClick={() => handleNextPage(pageNum+1,page_size)}> Next Page </Button>
              <Button onClick={() => handlePreviousPage(pageNum-1,page_size)}> Previos Page </Button>
  
              {/* <Pagination
                    // className={s.History__list_pagination}
                    currentPage={page_num}
                    totalCount={30}
                    pageSize={2}
                    siblingCount={1}
                    onPageChange={(page) =>
                      handleNextPage(page, page_size)
                    }
                    arrowsSpacing={0.15}
              /> */}
  
            </Table>
          </>
        )}
      </Card>
    );
  }
  