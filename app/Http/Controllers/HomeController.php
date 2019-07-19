<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    public function messages()
    {
        $messages = Message::with(['user'])->get();
        return response()->json($messages);
    }

    public function sendMessage(Request $request)
    {
        $message = $request->post('message');
        $user = Auth::user()->load(['messages']);
        $message = $user->messages()->create(['message' => $message]);

        broadcast(new MessageSent($user, $message))->toOthers();

        return response()->json(['name' => $user->name, 'message' => $message->message]);
    }
}
