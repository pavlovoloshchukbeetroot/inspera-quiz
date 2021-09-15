import React, { useMemo, useState } from "react"
import { useRouteMatch } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getCurrentQuiz, getActiveData } from "../../store/selectors"
import { ArrowForwardIcon, CheckIcon } from "@chakra-ui/icons"
import { actions as timeActions } from "../../store/time"
import { actions as quizActions } from "../../store/quiz"
import { Blocks } from "../../components"
import { securedRoute } from "../utils"
import { NotFound } from "../NotFound"
import { TrigerModal } from "./Modal"
import { Results } from "./Results"
import { Input } from "./inputs"
import { Timer } from "./Timer"
import { 
  Progress,
  Divider,
  Heading, 
  Button,
  Box,
  Flex,
} from "@chakra-ui/react"


export const Quiz = securedRoute(() => {
  const { params } = useRouteMatch<{ uuid: string }>()
  const record = useSelector(getCurrentQuiz(params.uuid))
  const data = useSelector(getActiveData)
  const dispatch = useDispatch()
  const handleBack = () => history.back()
  const handleChange = (index: number) => (value: any) =>
    dispatch(quizActions.update({ index, value }))
  const handleStart = () => {
    dispatch(quizActions.start(params.uuid))
    dispatch(timeActions.start(record!))
  }
  const handleSubmit = () => {
    dispatch(quizActions.submit({ result: data?.answers, id: params.uuid }))
    dispatch(timeActions.clear())
  }
  
  if (!record) return <NotFound />
  
  const [ activeIndex, setActiveIndex ] = useState(0)
  const { question, answer } = useMemo(() => ({ 
    question: record?.quiz.questions[activeIndex] ?? {},
    answer: data?.answers[activeIndex] ?? null
  }), [activeIndex, record, data])  

  const answersQuantity = Object.entries(data?.answers ?? {}).length ?? 0 
  const recordsQuantity = record.quiz.questions.length
  const progress = answersQuantity / recordsQuantity * 100
  const isComplete = answersQuantity === recordsQuantity

  const nextIndex = useMemo(() => isComplete ? null :
    record?.quiz.questions.reduce((acc, _, index, questions): any => {
      const modIndex = (activeIndex + index + 1) % questions.length
      return acc !== null || typeof data?.answers[modIndex] !== 'undefined' 
        ? acc : modIndex
  }, null), [record, activeIndex, data])

  return (
    <Box padding={4}>
      <Flex marginBottom={4} justifyContent="space-between" alignItems="center">
        <Heading as="h1">
          {record.quiz.title}
          {data?.result && ' - Complete'}
        </Heading>
        {!data?.result && data && <Timer />}
      </Flex>
      <Box paddingY={4}>
        <Progress hasStripe value={progress} colorScheme={data?.result && "green"}/>
      </Box>
      {data?.result ? (
        <Results {...data.result} questions={record?.quiz.questions}/>
      ) : (
        <Flex marginTop={4}>
        <Flex width={130} flexWrap="wrap" alignContent="flex-start">
          {record.quiz.questions.map((_, index) => {
            const value = (index + 1).toString().padStart(2, '0')
            const answer = data?.answers[index]
            const isActive = activeIndex === index
            const isFilled = typeof answer !== 'undefined'
            return (
              <Button 
                key={index}
                width={35}
                marginBottom={2}
                marginRight={index % 2 ? 0 : 2}
                variant={isActive ? 'solid' : isFilled ? 'outline' : 'ghost'}
                onClick={setActiveIndex.bind(0, index)}
                disable={answer}>
                {isFilled ? <CheckIcon /> : value}
              </Button>
            )
          })}
        </Flex>
        <Divider orientation="vertical" />
        <Box flexGrow={1}>
          <Blocks content={question.description} />
          <Divider marginY={4} />
          <Input {...question}
            onChange={handleChange(activeIndex)} 
            value={answer} />
          <Divider marginY={4} />
          <Flex justifyContent="flex-end">
            <Button
              colorScheme={isComplete ? 'blue' : undefined}
              variant={isComplete ? 'solid' : 'ghost'}
              onClick={isComplete ? handleSubmit : setActiveIndex.bind(0, nextIndex ?? 0)}
              rightIcon={<ArrowForwardIcon />}>
              {isComplete ? 'Submit answers' : 'Next question'}
            </Button>
          </Flex>
        </Box>
      </Flex>
      )}
      <TrigerModal
        title={record.quiz.title}
        // description={record.quiz.description}
        isOpen={!data?.answers}
        onBack={handleBack} 
        onStart={handleStart} />
    </Box>
  )
})
