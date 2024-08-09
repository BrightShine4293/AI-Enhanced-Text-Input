<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ShortenSentenceController extends Controller
{
    public function makeShorter(Request $request)
    {
        $content = $request->query('content');
        
        $client = new Client();
        $response = $client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer '.env('OPENAI_API_KEY'),
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-3.5-turbo-1106', // Choose the model you prefer
                'messages' => [
                    ["role" => "system", "content" => "Please simplify the following sentence while retaining its essential meaning."],
                    ["role" => "user", "content" => $content]
                ],
                'temperature' => 0.7,
                'max_tokens' => 1024,
                'top_p' => 1.0,
                'frequency_penalty' => 0.0,
                'presence_penalty' => 0.0,
            ],
        ]);

        $responseBody = json_decode($response->getBody(), true);
        $shortenedSentence = $responseBody['choices'][0]['message']["content"] ?? 'Could not shorten the sentence.';

        return response()->json([
            'original' => $content,
            'result' => trim($shortenedSentence),
        ]);
    }
}
