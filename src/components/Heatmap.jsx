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

/**
 * Track the highest milage day to use for the color calculation.
 */
let maxContriInADay = 0;

const normalizeDate = date => date.toDateString();

const processRun = ({pubDate, link, title}) => ({
  date: normalizeDate(new Date(pubDate)),
  numOfContri: 1,
  link,
  title,
});

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

/**
 * Returns a nicely formatted array of days and how many miles run in that day.
 */
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

    if (count > maxContriInADay) {
      maxContriInADay = count;
    }

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


const Heatmap = ({ postData }) => {
  const blogData = postData || [
    {
      pubDate: '2019/5/1',
      link: 'https://favorite-blogs.netlify.com',
      title: '日記その1',
    },
    {
      pubDate: '2019/5/1',
      link: 'https://favorite-blogs.netlify.com',
      title: '日記その1',
    },
    {
      pubDate: '2019/5/4',
      link: 'https://favorite-blogs.netlify.com',
      title: '日記その2',
    },
    {
      pubDate: '2019/5/6',
      link: 'https://favorite-blogs.netlify.com',
      title: '日記その3',
    },
    {
      pubDate: '2019/5/13',
      link: 'https://favorite-blogs.netlify.com',
      title: '日記その4',
    },
    {
      pubDate: '2019/5/14',
      link: 'https://favorite-blogs.netlify.com',
      title: '日記その5',
    },
    {
      pubDate: '2019/5/14',
      link: 'https://favorite-blogs.netlify.com',
      title: '日記その6',
    },
    {
      pubDate: '2019/5/21',
      link: 'https://favorite-blogs.netlify.com',
      title: '日記その7',
    },
    {
      pubDate: '2019/5/29',
      link: 'https://favorite-blogs.netlify.com',
      title: '日記その8',
    },
    {
      pubDate: '2019/5/31',
      link: 'https://favorite-blogs.netlify.com',
      title: '日記その9',
    },
  ];

  const contriByDay = formatContriGrid(blogData, 20);
  const numberOfWeeksOfContri = contriByDay.length / 7;

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
        aria-label="Contributions I've done in the past few months"
      >
        {contriByDay.map(day => {
          const getTooltipDate = date => `${date.getFullYear()}/${months[date.getMonth()]}/${date.getDate()}`;

          const tooltipText = day.count
            ? `<small>${getTooltipDate(new Date(day.date))}</small><ul style="margin:0; padding:0 0 0 1rem;">${day.posts.map(p => `<li style="margin-bottom:0.5rem;">${p.title}</li>`).join('')}</ul>`
            : undefined;
          // const tooltipText = day.count
          //   ? `<small>${getTooltipDate(new Date(day.date))}</small><ul style="margin:0; padding:0 0 0 1rem;">${day.posts.map(p => `<li style="margin-bottom:0.5;"><a href="${p.link}">${p.title}</a></li>`).join('')}</ul>`
          //   : undefined;

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
      <ReactTooltip
        html={true}
      />
    </Container>
  );
};


export default Heatmap;