import { useState } from "react";
import { Button, Col, Collapse, Row } from "react-bootstrap";
import { TYPE_BUY, TYPE_SELL } from "./NewTransactionModal";
import {
  FunnyLogo,
  LargeText,
  NiceButton,
  SmallLabel,
  StatsValue,
} from "./styles";

function Coin({
  coin: { name, acquisitionCost, hodl, transactions },
  price,
  edit,
  deleteTransactionCallback,
}) {
  const [open, setOpen] = useState(false);
  const [openTransactions, setOpenTransactions] = useState(false);

  const value = price * hodl;
  const profit = value - acquisitionCost;
  const profitPercentage =
    acquisitionCost > 0 ? (value * 100) / acquisitionCost - 100 : 0;
  const buyTransactions = transactions.filter((t) => t.type === TYPE_BUY);
  const avgBuyRate =
    buyTransactions.reduce((p, c) => p + c.rate * c.right, 0) /
    buyTransactions.reduce((p, c) => p + c.right, 0);

  return (
    <>
      <Row className="mt-3">
        <Col
          xs
          lg
          className="align-items-center d-flex flex-grow-0 text-nowrap"
        >
          <FunnyLogo
            src={require(`./img/${name.toLowerCase()}.svg`).default}
            alt={name}
            width="40"
            height="40"
            upsidedown={open}
          />
          <h4
            style={{ whiteSpace: "nowrap", cursor: "pointer" }}
            className="m-0 ml-2"
            onClick={() => setOpen((open) => !open)}
          >
            {name}
          </h4>
        </Col>
        <Col className="d-none d-lg-flex align-items-center">
          <div
            style={{
              height: "1px",
              width: "100%",
              backgroundColor: "#666",
            }}
          ></div>
        </Col>
        <Col className="flex-lg-grow-0 text-nowrap text-right">
          <StatsValue value={profit}>
            {profit.toLocaleString()} EUR {profitPercentage.toLocaleString()} %
          </StatsValue>
          <div>{price.toLocaleString()} EUR</div>
        </Col>
      </Row>

      <Collapse in={open}>
        <div>
          <Row className="my-2">
            <Col sm={12} md={3} className="">
              <SmallLabel>Acquisition Cost</SmallLabel>
              <LargeText>{acquisitionCost.toLocaleString()} EUR</LargeText>
            </Col>
            <Col sm={12} md={3} className="">
              <SmallLabel>Avg buy rate</SmallLabel>
              <LargeText>{avgBuyRate.toLocaleString()} EUR</LargeText>
            </Col>
            <Col sm={12} md={3} className="">
              <SmallLabel>HODL</SmallLabel>
              <LargeText>{hodl}</LargeText>
            </Col>
            <Col sm={12} md={3} className="text-left text-lg-right">
              <SmallLabel>Current Holdings</SmallLabel>
              <LargeText>{value.toLocaleString()} EUR</LargeText>
            </Col>
          </Row>
          <Row className="p-2 text-center">
            <Col>
              <NiceButton onClick={() => setOpenTransactions((t) => !t)}>
                {openTransactions ? "Hide" : "Show"} transactions
              </NiceButton>
            </Col>
          </Row>
          <div
            className={`bg-white shadow rounded mt-2 ${
              openTransactions ? "d-block" : "d-none"
            }`}
          >
            {transactions.map((transaction, i) => (
              <div key={i} className="border-bottom p-2">
                <Row className="align-items-center">
                  <Col xs={transaction.type === TYPE_SELL ? 12 : 6} lg={3}>
                    <SmallLabel>Rate</SmallLabel>
                    {transaction.rate.toLocaleString()} EUR
                  </Col>
                  {transaction.type === TYPE_SELL && (
                    <Col xs lg={3}>
                      <SmallLabel>Take profit</SmallLabel>
                      {transaction.takeProfit.toLocaleString()}
                    </Col>
                  )}
                  <Col xs lg>
                    <div
                      className="d-flex justify-content-between align-items-center text-right text-lg-right"
                      style={{ minHeight: "32px" }}
                    >
                      <div className="w-100">
                        <div>{transaction.left.toLocaleString()} EUR</div>
                        <div>
                          {transaction.right.toFixed(5)} {name}
                        </div>
                      </div>
                      {edit && (
                        <Button
                          variant="outline-dark"
                          size="sm"
                          className="ml-2 ml-lg-2"
                          onClick={() =>
                            deleteTransactionCallback(transaction.id)
                          }
                        >
                          &#x2715;
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default Coin;
