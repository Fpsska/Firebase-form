import React from 'react';

import './sectionMark.scss';

// /. imports

const SectionMark: React.FC<{ additionalClass?: string }> = ({
    additionalClass
}) => {
    return (
        <div
            className={`section-mark ${additionalClass ? additionalClass : ''}`}
        >
            OR
        </div>
    );
};

export default SectionMark;
