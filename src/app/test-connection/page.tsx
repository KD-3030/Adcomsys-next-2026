'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestConnectionPage() {
  const [status, setStatus] = useState<{
    connected: boolean
    error?: string
    tables?: string[]
    authWorking?: boolean
  }>({
    connected: false,
  })

  useEffect(() => {
    async function testConnection() {
      const supabase = createClient()
      
      try {
        // Test 1: Check if Supabase client is initialized
        console.log('Testing Supabase connection...')
        
        // Test 2: Try to query a simple table
        const { data: tables, error: tablesError } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
        
        if (tablesError) {
          console.error('Table query error:', tablesError)
          setStatus({
            connected: true,
            error: `Database error: ${tablesError.message}`,
            authWorking: true,
          })
          return
        }

        // Test 3: Check auth
        const { data: authData, error: authError } = await supabase.auth.getSession()
        
        setStatus({
          connected: true,
          tables: ['profiles table exists!'],
          authWorking: !authError,
          error: authError ? authError.message : undefined,
        })
      } catch (err: any) {
        console.error('Connection test failed:', err)
        setStatus({
          connected: false,
          error: err.message,
        })
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Environment Variables:</h3>
            <div className="bg-gray-100 p-4 rounded text-sm font-mono space-y-1">
              <div>
                <strong>URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing'}
              </div>
              <div>
                <strong>Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Connection Status:</h3>
            <div className="bg-gray-100 p-4 rounded text-sm space-y-2">
              <div>
                <strong>Connected:</strong> {status.connected ? 'Yes' : 'No'}
              </div>
              {status.authWorking !== undefined && (
                <div>
                  <strong>Auth Working:</strong> {status.authWorking ? 'Yes' : 'No'}
                </div>
              )}
              {status.tables && (
                <div>
                  <strong>Tables:</strong> {status.tables.join(', ')}
                </div>
              )}
              {status.error && (
                <div className="text-red-600">
                  <strong>Error:</strong> {status.error}
                </div>
              )}
            </div>
          </div>

          {status.error && status.error.includes('relation "public.profiles" does not exist') && (
            <div className="bg-red-50 border border-red-200 p-4 rounded space-y-2">
              <h3 className="font-semibold text-red-800">Database Schema Not Deployed!</h3>
              <p className="text-sm text-red-700">
                The database tables don't exist yet. You need to:
              </p>
              <ol className="text-sm text-red-700 list-decimal list-inside space-y-1">
                <li>Open Supabase Dashboard → SQL Editor</li>
                <li>Copy contents of <code className="bg-red-100 px-1">supabase-schema.sql</code></li>
                <li>Paste and click "Run"</li>
                <li>Wait for success message</li>
                <li>Then try login/signup again</li>
              </ol>
            </div>
          )}

          {!status.error && status.connected && (
            <div className="bg-green-50 border border-green-200 p-4 rounded">
              <h3 className="font-semibold text-green-800">Everything looks good!</h3>
              <p className="text-sm text-green-700 mt-2">
                Your Supabase connection is working. You can try logging in now.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
