import { FC, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button, Flex, Input } from "antd"

interface FactResponse {
    fact: string;
    length: number;
}

const RandomFactForm: FC = () => {
    const fetchRandomFact = useCallback(async () => {
        const response = await fetch('https://catfact.ninja/fact')
        if (!response.ok) {
            throw new Error('Sorry, an error occured')
        }
        const data = await response.json()
        if (!data.fact) {
            throw new Error('Sorry, an error occured')
        }
        return data as FactResponse
    }, [])

    const { isLoading, isError, error, data, refetch } = useQuery<FactResponse>({
        queryKey: ['fact'],
        queryFn: fetchRandomFact,
        retry: false,
        enabled: false
    })

    return (
        <Flex
            align="center"
            gap="middle">
            <Button
                type="primary"
                onClick={() => refetch()}>
                Get a random fact about cats
            </Button>
            <Input.TextArea
                readOnly
                value={isLoading ? 'Loading...' : isError ? error.message : data?.fact || ''}
                rows={4}
            />
        </Flex>
    )
}

export default RandomFactForm