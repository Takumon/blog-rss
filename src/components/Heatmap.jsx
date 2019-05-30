import React from "react";
import times from 'lodash.times';
import groupBy from 'lodash.groupby';
import reduce from 'lodash.reduce';
import chunk from 'lodash.chunk';
import { scaleLinear } from "@vx/scale";
import styled from "@emotion/styled";
import ReactTooltip from 'react-tooltip'

const months = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
];

const normalizeDate = date => date.toDateString();

const processRun = ({pubDate, link, title}) => ({
  date: normalizeDate(new Date(pubDate)),
  numOfContri: 1,
  link,
  title,
});


const formatContriGrid = (activities, numWeeks) => {
  const contri = activities.map(processRun);
  const contriByDate = groupBy(contri, "date");

  const d = new Date();

  const currentDayOfWeek = d.getDay();

  d.setDate(d.getDate() - numWeeks * 7 + (7 - currentDayOfWeek));

  return times(numWeeks * 7, () => {
    const day = normalizeDate(d);

    d.setDate(d.getDate() + 1);

    const count = reduce(
      contriByDate[day],
      (sum, activity) => sum + activity.numOfContri,
      0,
    );


    const posts = reduce(
      contriByDate[day],
      (result, activity) =>  {
        result.push({
          link: activity.link,
          title: activity.title,
        });
        return result;
      },
      [],
    );

    return {
      date: day,
      count,
      posts,
    };
  });
};


const Container = styled.div`
  background-color: white;
  border: 1px solid white;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'contributions';
  grid-gap: 0.5rem;
  width: 100%;
  left: 0;
  position: relative;
  font-size: 12px;
`;

const UnstyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;


const Heatmap = ({ postData }) => {
  
  const contriByDay = formatContriGrid(postData, 20);
  const numberOfWeeksOfContri = contriByDay.length / 7;

  const maxContriInADay = Math.max(...contriByDay.map(c => c.count)) || 1;

  const colorScale = scaleLinear({
    range: ["#ebedf0", "#1a96ae"],
    domain: [0, maxContriInADay],
  });

  return (
    <Container>
      <UnstyledList
        css={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numberOfWeeksOfContri}, 1fr)`,
          gridTemplateRows: `repeat(7, auto)`,
          gridGap: '1px',
          gridAutoFlow: 'column',
          gridArea: 'contributions',
        }}
      >
        {contriByDay.map(day => {
          const getTooltipDate = date => `${date.getFullYear()}/${months[date.getMonth()]}/${date.getDate()}`;

          const tooltipText = day.count
            ? `<small>${getTooltipDate(new Date(day.date))}</small><ul style="margin:0; padding:0 0 0 1rem;">${day.posts.map(p => `<li style="margin-bottom:0.5rem;">${p.title}</li>`).join('')}</ul>`
            : undefined;

          return (
            <li
              css={{
                backgroundColor: colorScale(day.count),
                paddingBottom: "100%",
                height: 0,
                marginBottom: '0px',
              }}
              data-tip={tooltipText}
              title={tooltipText}
              key={day.date}
            />
          );
        })}
      </UnstyledList>
      <ReactTooltip html={true} />
    </Container>
  );
};


export default Heatmap;