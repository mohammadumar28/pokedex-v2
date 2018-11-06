import React, { Component } from "react";
import { observer } from "mobx-react";
import "antd/dist/antd.css";
import { Card, Tag, Divider } from "antd";
import { Box } from "@rebass/grid";

const { Meta } = Card;


export const RenderPokemons = observer(class RenderPokemons extends Component {
  render() {
    let { currentPokemons, loaded } = this.props;
    return (
      <React.Fragment>
        {currentPokemons.map(item => {
          return (
            <Box key={item.name} p={2} width={[1, 1 / 2, 1 / 3, 1 / 4]}>
              <Card
                loading={loaded}
                hoverable
                key={item.name}
                style={{ width: 300, margin: "0 auto", cursor: "default" }}
                cover={
                  <img
                    style={{ width: 150, margin: "0px auto" }}
                    src={item.sprites.front_default}
                    alt={item.name}
                  />
                }
              >
                <Meta
                  title={item.name.toUpperCase()}
                  description={item.types.map(item => (
                    <Tag
                      style={{ margin: "10px 4px 10px 4px" }}
                      key={item.type.name}
                      color={
                        item.type.name === "psychic"
                          ? "magenta"
                          : item.type.name === "dark"
                            ? "black"
                            : item.type.name === "electric"
                              ? "gold"
                              : item.type.name === "bug"
                                ? "volcano"
                                : item.type.name === "water"
                                  ? "blue"
                                  : item.type.name === "ground"
                                    ? "orange"
                                    : item.type.name === "rock"
                                      ? "gray"
                                      : item.type.name === "ice"
                                        ? "cyan"
                                        : item.type.name === "poison"
                                          ? "purple"
                                          : item.type.name === "normal"
                                            ? ""
                                            : item.type.name === "ghost"
                                              ? "geekblue"
                                              : item.type.name === "fairy"
                                                ? "gold"
                                                : item.type.name === "fighting"
                                                  ? "red"
                                                  : item.type.name === "dragon"
                                                    ? "volcano"
                                                    : item.type.name === "grass"
                                                      ? "green"
                                                      : item.type.name ===
                                                        "flying"
                                                        ? "blue"
                                                        : item.type.name ===
                                                          "fire"
                                                          ? "red"
                                                          : item.type.name ===
                                                            "steel"
                                                            ? "silver"
                                                            : ""
                      }
                    >
                      {item.type.name}
                    </Tag>
                  ))}
                />
                <Divider>Stats</Divider>
                <Meta
                  style={{ marginTop: 10 }}
                  title=""
                  description={
                    <React.Fragment>
                      {item.stats.map(item => (
                        <div key={item.stat.name}>
                          <p>
                            {item.stat.name} : {item.base_stat}
                          </p>
                        </div>
                      ))}
                    </React.Fragment>
                  }
                />
              </Card>
            </Box>
          );
        })}
      </React.Fragment>
    );
  }
})