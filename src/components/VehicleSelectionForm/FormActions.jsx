import React from 'react'

import Button, { ButtonContainer, RightSideButtonContainer } from '../Base/Button'

export default ({
  nextBtnText,
  isNextBtnDisabled,
  hasPreviousBtn,
  hasRestartBtn,
  onNextBtnClick,
  onPreviousBtnClick,
  onRestartBtnClick
}) => (
    <>
      <ButtonContainer>
        <RightSideButtonContainer>
          <Button onClick={onNextBtnClick} disabled={isNextBtnDisabled} tabIndex="2">
            {nextBtnText || 'Próximo'}
          </Button>
        </RightSideButtonContainer>
        {hasPreviousBtn && (
          <Button onClick={onPreviousBtnClick} tabIndex="4" secondary>Anterior</Button>
        )}
        {hasRestartBtn && (
          <Button onClick={onRestartBtnClick} tabIndex="3" secondary>Reiniciar</Button>
        )}
      </ButtonContainer>
    </>
  )