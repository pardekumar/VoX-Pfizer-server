const data: any = [
  {
    session_id: 1,
    title: "sample session",
    created_ts: "2023-06-12T14:56:29",
    temp: 0.1,
    engine: "",
    max_tokens: 125,
    messages: [
      {
        msg_id: 0,
        usr_session_id: 1567,
        msg_type: "system",
        msg: "sample system prompt",
        msg_seq_num: 1,
        msg_ts: "2023-06-12T14:56:29",
        parent_msg_id: -1,
        like: null, // null by default
      },
      {
        msg_id: 1,
        usr_session_id: 1567,
        msg_type: "prompt",
        msg: "sample system prompt",
        msg_seq_num: 2,
        msg_ts: "2023-06-12T14:56:29",
        parent_msg_id: 0,
        like: 1,
      },
    ],
  },
  {
    session_id: 2,
    title: "sample session",
    created_ts: "2023-06-12T14:56:29",
    temp: 0.1,
    max_tokens: 125,
    messages: [],
  },
];
let sessionInd = 2;

export default {
  addSession: (params: any) => {
    const { temp, max_tokens, engine, title } = params;
    sessionInd = sessionInd + 1;
    data.push({
      session_id: sessionInd,
      title,
      created_ts: new Date(),
      temp: temp,
      max_tokens,
      engine,
      messages: [],
    });
    return { session_id: sessionInd };
  },
  getSessions: (params: any) => {
    const { limit } = params;
    let cnt = 0;
    const retData: any = [];
    for (let i = data.length - 1; i >= 0; i = i - 1) {
      retData.push({
        session_id: data[i].session_id,
        title: data[i].title,
        created_ts: data[i].created_ts,
        temp: data[i].temp,
        max_tokens: data[i].max_tokens,
        engine: data[i].engine,
      });
      cnt++;
      if (cnt === limit) break;
    }
    return { data: retData };
  },
  getChatHistory: (params: any) => {
    const retData: any = [];
    const { session_id } = params;
    let sessionFound = false;
    for (let i = 0; i < data.length; i = i + 1) {
      if (data[i].session_id === session_id) {
        sessionFound = true;
        for (let j = 0; j < data[i].messages.length; j = j + 1) {
          const mes = data[i].messages[j];
          retData.push({
            msg_id: mes.msg_id,
            usr_session_id: mes.usr_session_id,
            msg_type: mes.msg_type,
            msg: mes.msg,
            msg_seq_num: mes.msg_seq_num,
            msg_ts: mes.created_ts,
            parent_msg_id: mes.parent_msg_id,
            like: mes.like,
          });
        }
        break;
      }
    }
    if (!sessionFound) return { status: "fail", message: "Session not found" };
    return { data: retData };
  },
  updateSession: (params: any) => {
    const { session_id, temp, max_tokens, engine, title } = params;
    let status = "fail";
    let sessionFound = false;
    for (let i = 0; i < data.length; i = i + 1) {
      if (data[i].session_id === session_id) {
        sessionFound = true;
        status = "success";
        data[i] = {
          ...data[i],
          title,
          temp,
          max_tokens,
          engine,
        };
        break;
      }
    }
    if (!sessionFound) return { status: "fail", message: "Session not found" };
    return { session_id, status };
  },
  voxCompletion: (params: any) => {
    const retData: any = [];
    const { session_id, temperature, max_tokens, engine, messages } = params;
    let sessionFound = false;
    for (let i = 0; i < data.length; i = i + 1) {
      if (data[i].session_id === session_id) {
        sessionFound = true;
        const sysMsg = messages.filter((item: any) => item.role === "system");
        const userMsg = messages.filter((item: any) => item.role === "user");
        const maxId = data[i].messages.length;
        const seqInd = maxId > 0 ? data[i].messages[maxId - 1].msg_seq_num : 0;
        const parentInd =
          maxId > 0 ? data[i].messages[maxId - 1].parent_msg_id : -1;
        if (sysMsg.length) {
          retData.push(sysMsg[0]);
        }
        if (userMsg.length) {
          const newUserMsg: any = {
            msg_id: maxId,
            usr_session_id: session_id,
            msg_type: "prompt",
            msg: userMsg[0].content,
            msg_seq_num: seqInd + 1,
            msg_ts: new Date(),
            parent_msg_id: parentInd,
            like: null,
          };
          const newResMsg: any = {
            msg_id: maxId + 1,
            usr_session_id: session_id,
            msg_type: "prompt",
            msg: "response content here",
            msg_seq_num: seqInd + 2,
            msg_ts: new Date(),
            parent_msg_id: maxId,
            like: null,
          };
          data[i].messages.push(newUserMsg);
          data[i].messages.push(newResMsg);
          retData.push(newUserMsg);
          retData.push(newResMsg);
        }
        break;
      }
    }
    if (!sessionFound) return { status: "fail", message: "Session not found" };
    return {
      status: "success",
      result:
        '{\n "role": "assistant",\n "content": "response content here"\n}',
      message: retData,
      totalTokens: 50,
    };
  },
};
