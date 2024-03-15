import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button, Form, Input } from "antd"

interface AgeResponse {
    name: string;
    age: number;
    count: number;
}

const AgeByName: FC = () => {
    const [username, setUsername] = useState<string>('')
    const lastRequestedUsername = useRef<string>('')

    const fetchAgeByName = useCallback(async ({ signal }: { signal: AbortSignal }) => {
        const response = await fetch(
            `https://api.agify.io?name=${username}`,
            { signal }
        )
        if (!response.ok) {
            throw new Error('Sorry, an error occured')
        }
        const data = await response.json()
        if (!data.age) {
            throw new Error('Sorry, an error occured')
        }
        return data as AgeResponse
    }, [username])

    const { isLoading, isError, error, data, refetch } = useQuery<AgeResponse>({
        queryKey: ['age'],
        queryFn: fetchAgeByName,
        retry: false,
        enabled: false
    })

    useEffect(() => {
        const timerId = setTimeout(() => {
            onSubmit({ preventDefault: () => { } } as FormEvent)
        }, 3000)

        return () => {
            clearTimeout(timerId)
        }
    }, [username])

    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (username !== lastRequestedUsername.current && /^[a-zA-Z]+$/u.test(username)) {
            lastRequestedUsername.current = username
            refetch()
        }
    }

    return (
        <Form
            name="age-by-name"
            onSubmitCapture={onSubmit}
        >
            <Form.Item
                label="Enter yout name:"
                name="username"
                rules={[{ required: true, message: 'Please enter your name!' },
                { pattern: /^[a-zA-Z]+$/u, message: 'Please enter only letters!' }]}
            >
                <Input
                    value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    autoComplete="off"
                />
            </Form.Item>
            <Form.Item>
                <div>
                    {isLoading ? 'Loading...' : isError ? error.message : data?.age || ''}
                </div>
            </Form.Item>
            <Form.Item >
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Get age
                </Button>
            </Form.Item>
        </Form >
    )
}

export default AgeByName