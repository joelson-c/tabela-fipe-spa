import styled from 'styled-components'

export default styled.div`
  &:empty {
    width: 100%;
    height: 172px;

    background-repeat: no-repeat;

    background-image:
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 100%),


      /* price */
      linear-gradient(lightgray 200px, transparent 0),

      /* reference month */
      linear-gradient(lightgray 300px, transparent 0),

      /* vehicle model year */
      linear-gradient(lightgray 200px, transparent 0),

      /* fipe code */
      linear-gradient(lightgray 200px, transparent 0);

    background-size:
      65px 172px,
      250px 34px,
      200px 20px,
      300px 20px,
      200px 20px;

    background-position:
      0 0,
      0 0,
      0 62px,
      0 99px,
      0 136px;

    animation: loading 1.3s infinite;
  }

  @keyframes loading {
    to {
      background-position:
        100% 0,
        0 0,
        0 62px,
        0 99px,
        0 136px;
    }
  }
`
