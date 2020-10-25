import React from 'react';

import { Formiz, useForm, FormizStep } from '@formiz/core';
import { SimpleGrid, Heading, Box, Button } from '@chakra-ui/core';

import LaunchPads from './launch-pads';
import LandPads from './land-pads';
import Rockets from './rockets';

export default function LaunchBuilder () {
  const myForm = useForm()
  const [isLoading] = React.useState(false)
  const submitForm = (values) => {
    console.log("user picked: ", JSON.stringify(values))
  }
  return (
    <React.Fragment>
      <Heading ml="1.5rem">Build your launch</Heading> 
      <SimpleGrid m={[1, null, 6]} minChildWidth="350px" spacing="4">
        <Formiz onValidSubmit={submitForm} connect={myForm}>
          <form noValidate onSubmit={myForm.submitStep} className="launch-form">
            <div className="form-content">
              <FormizStep name="step1"> 
                <LaunchPads page-size="PAGE_SIZE" name="launch-pad" required="Pick a Launch Pad"/> 
              </FormizStep>
              <FormizStep name="step2">
                <Rockets page-size="PAGE_SIZE" name="rocket" required="Pick a Rocket"/>
              </FormizStep>
              <FormizStep name="step3"> 
                <LandPads page-size="PAGE_SIZE" name="land-pad" required="Pick a Land Pad"/>
              </FormizStep>
            </div>

            <Box mt="10px" className="form-footer">
              <div className="text-sm text-gray-500 p-2 text-center w-full xs:w-auto order-first xs:order-none">
                Step {' '} {(myForm.currentStep && myForm.currentStep.index + 1) || 0} {' '} of
                {' '}
                {myForm.steps.length}
              </div>
              <div>
                {!myForm.isFirstStep && (
                  <Button mr="10px" onClick={myForm.prevStep}>Previous</Button>
                )}

                {myForm.isLastStep ? (
                  <Button
                    type="submit"
                    isDisabled={isLoading || (!myForm.isValid && myForm.isStepSubmitted)}
                  >
                    {isLoading ? 'Loading...' : 'Submit'}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    isDisabled={!myForm.isStepValid && myForm.isStepSubmitted}
                  >
                    Next
                  </Button>
                )}
              </div>
            </Box>
          </form>
        </Formiz>
      </SimpleGrid>
    </React.Fragment>
  )
}