import React, { Component } from "react";
import { observer } from "mobx-react";
import "antd/dist/antd.css";
import { Pagination, Input, Radio } from "antd";
import { Flex, Box } from "@rebass/grid";
import { RenderPokemons } from "./RenderPokemons";

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;



export  const App = observer(class App extends Component {
  handleClick = page => {
    this.props.store.currentPage = Number(page);
  };

  handleChange = e => {
    this.props.store.itemsPerPage = Number(e.target.value);
  };

  handleSearch = e => {
    this.props.store.searchText = e.target.value;
  };

  render() {
    const {
      itemsPerPage,
      currentPage,
      loaded,
      fetchPokemons,
      filteredPokemons,
      searchText
    } = this.props.store;

    return (
      <React.Fragment>
        {!loaded ? (
          <p>Loading</p>
        ) : (
          <React.Fragment>
            <Flex flexWrap="wrap">
              <Box
                width={1}
                p={1}
                style={{ textAlign: "center", fontSize: 50 }}
              >
                <h1>Pokedex</h1>
              </Box>
              <Box width={1} p={4}>
                <h2>Search Pokemons</h2>
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onPressEnter={this.handleSearch}
                  onChange={this.handleSearch}
                />
              </Box>
            </Flex>

            {searchText.length === 0 ? (
              <React.Fragment>
                <Flex flexWrap="wrap">
                  <Box width={1} p={4}>
                    <h2>Select total items to show per page</h2>
                    <RadioGroup
                      onChange={this.handleChange}
                      value={itemsPerPage}
                    >
                      <RadioButton value={10}>10 Items</RadioButton>
                      <RadioButton value={20}>20 Items</RadioButton>
                      <RadioButton value={50}>50 Items</RadioButton>
                    </RadioGroup>
                  </Box>

                  <Box width={1} p={4}>
                    <h2>Select Page</h2>
                    <Pagination
                      size="small"
                      current={currentPage}
                      onChange={this.handleClick}
                      total={filteredPokemons.length}
                      pageSize={itemsPerPage}
                    />
                  </Box>
                </Flex>

                <Flex flexWrap="wrap">
                  <RenderPokemons currentPokemons={fetchPokemons} />
                </Flex>
              </React.Fragment>
            ) : (
              <Flex flexWrap="wrap">
                <RenderPokemons currentPokemons={filteredPokemons} />
              </Flex>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
})