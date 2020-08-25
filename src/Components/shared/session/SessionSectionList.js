import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import partPreview from 'Utils/session/partPreview';
import { useAppTranslation } from 'Components/zume/translationHooks';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
  },
}));

export default function SessionSectionList({ sections }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const trans = useAppTranslation();

  if (!sections) {
    return <div>Session has no sections</div>;
  }

  return (
      <div>
        {sections.map((s, i) => {
          const parts = s.parts || [];
          return (
              <Accordion
                  key={i}
                  expanded={expanded === `panel${i}`}
                  onChange={handleChange(`panel${i}`)}
              >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${i}-content`}
                    id={`panel${i}-header`}
                >
                  <div>
                    {trans(s.t)}
                    <Typography
                        component="p"
                        style={{ marginTop: '0.3rem' }}
                        variant="caption"
                        color="textSecondary"
                    >
                      {trans(s.d) || s.d}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <List className={classes.list}>
                    {parts.map((p, i) => {
                      let { t, d } = partPreview(p);
                      return (
                          <React.Fragment key={i}>
                            <Divider component="li" />
                            <ListItem>
                              <ListItemText
                                  primary={trans(t)}
                                  secondary={trans(d)}
                                  secondaryTypographyProps={{ noWrap: true }}
                              />
                            </ListItem>
                          </React.Fragment>
                      );
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
          );
        })}
      </div>
  );
}
