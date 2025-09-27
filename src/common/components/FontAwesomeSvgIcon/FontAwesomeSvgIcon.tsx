import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
import { motion } from 'framer-motion';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface FontAwesomeSvgIconProps {
  icon: IconDefinition;
}

const MotionSvgIcon = motion(SvgIcon);

export const FontAwesomeSvgIcon = forwardRef<SVGSVGElement, FontAwesomeSvgIconProps>(
  ({ icon }, ref) => {
    const {
      icon: [width, height, , , svgPathData],
    } = icon;

    return (
      <MotionSvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
        {typeof svgPathData === 'string' ? (
          <path d={svgPathData} />
        ) : (
          svgPathData.map((d, i) => <path key={i} style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />)
        )}
      </MotionSvgIcon>
    );
  }
);
